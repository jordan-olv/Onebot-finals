import { Client } from "discord.js";
const fs = require("fs");
// Registration of Message-Based Legacy Commands.

/**
 * @type {String[]}
 * @description All command categories aka folders.
 */

module.exports = (client: Client, module: string) => {

  const commandsPath = `./src/modules/${module}/commands`;

  if (fs.existsSync(commandsPath)) {
    const commandFolders: string[] = fs.readdirSync(commandsPath);
    for (const folder of commandFolders) {
      const folderPath = `${commandsPath}/${folder}`;
      if (fs.existsSync(folderPath)) {
        const commandFiles: string[] = fs
          .readdirSync(folderPath)
          .filter((file: string) => file.endsWith(".ts"));
        for (const file of commandFiles) {
          console.log(`${folderPath}/${file}`)
          const command = require(`../modules/${module}/commands/${folder}/${file}`);
          client.commands.set(command.name, command);
          console.log(client);
        }
      }
    }
  }

};