import { Client } from "discord.js";
const fs = require("fs");
// Registration of Message-Based Legacy Commands.

/**
 * @type {String[]}
 * @description All command categories aka folders.
 */

module.exports = (client: Client, module: string) => {

  const commandsPath = `./src/bot/modules/${module}/commands`;
  console.log(commandsPath);
  if (fs.existsSync(commandsPath)) {
    const commandFolders: string[] = fs.readdirSync(commandsPath);
    for (const folder of commandFolders) {
      const folderPath = `${commandsPath}/${folder}`;
      console.log(folderPath);
      if (fs.existsSync(folderPath)) {
        const commandFiles: string[] = fs
          .readdirSync(folderPath)
          .filter((file: string) => file.endsWith(".ts"));
        for (const file of commandFiles) {
          const command = require(`../modules/${module}/commands/${folder}/${file}`);
          client.commands.set(command.name, command);
        }
      }
    }
  }

};