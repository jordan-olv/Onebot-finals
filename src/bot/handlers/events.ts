import { Client } from "discord.js";
const fs = require("fs");
// Registration of Message-Based Legacy Commands.

/**
 * @type {String[]}
 * @description All event categories aka folders.
 */

module.exports = (client: Client, module: string) => {

  //console.log(fs.readdirSync(`../modules/${module}/events`));
  const eventsPath = `./src/bot/modules/${module}/events`;

  if (fs.existsSync(eventsPath)) {
    fs.readdirSync(`./src/bot/modules/${module}/events`).forEach((dir: any) => {
      console.log(dir);
      const eventFiles = fs
        .readdirSync(`./src/bot/modules/${module}/events/${dir}`)
        .filter((file: string) => file.endsWith(".ts"));

      console.log(eventFiles)
      // Loop through all files and execute the event when it is actually emmited.
      for (const file of eventFiles) {
        const event = require(`../modules/${module}/events/${dir}/${file}`);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(
            event.name,
            async (...args) => await event.execute(...args, client)
          );
        }
      }
    })
  }

};