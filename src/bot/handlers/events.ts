import { client } from "../BotClient";
const fs = require("fs");
// Registration of Message-Based Legacy Commands.

/**
 * @type {String[]}
 * @description All event categories aka folders.
 */

module.exports = (Client: client, module: string) => {

  const eventsPath = `./src/bot/modules/${module}/events`;

  if (fs.existsSync(eventsPath)) {
    fs.readdirSync(`./src/bot/modules/${module}/events`).forEach((dir: any) => {
      const eventFiles = fs
        .readdirSync(`./src/bot/modules/${module}/events/${dir}`)
        .filter((file: string) => file.endsWith(".ts"));

      // Loop through all files and execute the event when it is actually emmited.
      for (const file of eventFiles) {
        const event = require(`../modules/${module}/events/${dir}/${file}`);
        if (event.once) {
          Client.once(event.name, (...args) => event.execute(...args, Client));
        } else {
          Client.on(
            event.name,
            async (...args) => await event.execute(...args, Client)
          );
        }
      }
    })
  }

};