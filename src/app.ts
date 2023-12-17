import { Client, Collection, GatewayIntentBits, Partials, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();



export const client = new Client({
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

client.commands = new Collection();
// client.slashCommands = new Collection();
// client.buttonCommands = new Collection();
// client.selectCommands = new Collection();
// client.contextCommands = new Collection();
// client.modalCommands = new Collection();
// client.cooldowns = new Collection();
// client.autocompleteInteractions = new Collection();
// client.triggers = new Collection();
// client.Database = require('./database/Mongoose');
// client.tools = require('./tools/tools');

// ["commands", "events", "slash", "triggers", "selectMenus", "contextMenus", "buttonInteraction", "autoComplete", "modalsInteraction", "registrationSlash", "mongoose"].forEach((file) => {
//   require(`./handlers/${file}`)(client);
// });

["modules"].forEach((file) => {
  require(`./handlers/${file}`)(client);
});

client.login(process.env.DISCORD_TOKEN);

