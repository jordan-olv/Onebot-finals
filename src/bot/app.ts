import { Client, Collection, GatewayIntentBits, Partials, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { client } from "./BotClient";
dotenv.config();

client.init();



//client.init();

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




