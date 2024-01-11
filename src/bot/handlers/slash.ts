import { Client } from "discord.js";
const fs = require("fs");

module.exports = (client: Client, module: string) => {

  const commandsPath = `./src/bot/modules/${module}/slash`;

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
          const command = require(`../modules/${module}/slash/${folder}/${file}`);
          console.log(`Slash command ${command.data.name} loaded!`);
          client.slashCommands.set(command.data.name, command);
        }
        console.log(client.slashCommands);
      }
    }
  }

};