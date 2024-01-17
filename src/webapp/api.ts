import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request, Response } from 'express';
//import { client } from '../bot/app';
import { client } from '../bot/BotClient';
const gameSchema = require('../database/schema/game.js');
import mongo, { get } from 'mongoose';

const app = express();

export default async (client: client) => {

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', 'src/webapp/views');
app.use(express.urlencoded({ extended: false }));

passport.use(new LocalStrategy(
  function (username: string, password: string, done) {
    if (username === "user" && password === "password") {
      return done(null, { id: 1, name: "User" });
    }
    return done(null, false);
  }
));

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: any, done) {
  done(null, { id: 1, name: "User" });
});

app.get('/', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.render('index', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/test', async (req: Request, res: Response) => {
  const guild = await getGuild('1148634282093445150');
  
  res.send(guild?.name);
});

app.post('/game/create', async (req: Request, res: Response) => {
  
  const guild = await getGuild('1148634282093445150');

  const gameName = req.body.gamename;
  const gameDescription = req.body.gamedescription;
  const gameImage = req.body.gameimage;
  const gameColor = req.body.gamecolor;

  const game = {
    name: gameName,
    description: gameDescription,
    image: gameImage,
    color: gameColor
  };
  
  client.emit('gameCreate', game, guild, client);

  res.send('ok');
});

const getGuild = async(id:string) => {
  const guild = client.guilds.cache.get(id);
  return guild;
}

app.listen(3002, () => {
  console.log('Serveur démarré sur http://localhost:3002');
});

}