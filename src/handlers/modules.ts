import { Client } from "discord.js";

const fs = require("fs");
module.exports = (client: Client) => {

  //LOAD MODULES
  const modules: string[] = fs.readdirSync("./src/modules");

  for (const module of modules) {

    require(`./commands`)(client, module);
    require(`./events`)(client, module);
  }
}