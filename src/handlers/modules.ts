import { Client } from "discord.js";

const fs = require("fs");
module.exports = (client: Client) => {

  //LOAD MODULES
  const modules: string[] = fs.readdirSync("./src/modules");


  for (const module of modules) {
    const commandsPath = './src/modules/' + module + '/commands';
    const eventsPath = './src/modules/' + module + '/events';

    //LOAD COMMANDS
    if (fs.existsSync(commandsPath)) {
      require(`./commands`)(client, module);
    }

    //LOAD EVENTS
    if (fs.existsSync(eventsPath)) {
      require(`./events`)(client, module);
    }
  }
}