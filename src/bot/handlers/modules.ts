import { client } from "../BotClient";
const fs = require("fs");
module.exports = (client: client) => {

  //LOAD MODULES
  const modules: string[] = fs.readdirSync("./src/bot/modules");


  for (const module of modules) {
    const commandsPath = './src/bot/modules/' + module + '/commands';
    const eventsPath = './src/bot/modules/' + module + '/events';
    const slashPath = './src/bot/modules/' + module + '/slash';

    //LOAD COMMANDS
    if (fs.existsSync(commandsPath)) {
      require(`./commands`)(client, module);
    }

    //LOAD EVENTS
    if (fs.existsSync(eventsPath)) {
      require(`./events`)(client, module);
    }

    //LOAD SLASH
    if (fs.existsSync(slashPath)) {
      require(`./slash`)(client, module);
    }
  }
}