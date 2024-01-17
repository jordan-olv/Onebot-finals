import { Client, Collection, GatewayIntentBits, Partials, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import api from '../webapp/api'

dotenv.config();

export class client extends Client {
  private static instance: client;

  public static async init() {
    if (!client.instance) {
      client.instance = new Client({
          // https://ziad87.net/intents/
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.GuildMessageReactions
          ],
          partials: [Partials.Channel, Partials.Reaction, Partials.Message],
        });

        client.instance.application?.commands.set([])
        client.instance.commands = new Collection();
        client.instance.slashCommands = new Collection();
        client.instance.database = require('../database/Mongoose');
      
        ["modules", "mongoose"].forEach((file) => {
          require(`./handlers/${file}`)(client.instance);
        });

        client.instance.login(process.env.TOKEN).then(() => {
          console.log(`[BOT] Logged in as ${client.instance.user?.tag}!`);
        });

        this.startDashboard();
    }

    return client.instance;
  }

  public static async getGuild(id:string) {
    return client.instance.guilds.cache.get(id);
  }
  
  public static async startDashboard() {
    api(client.instance);
  }
}