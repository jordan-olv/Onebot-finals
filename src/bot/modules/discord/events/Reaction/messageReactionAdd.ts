const { Events } = require("discord.js");
import { ChannelType } from "discord.js";
import { client } from "@client/BotClient";

module.exports = {
  name: Events.MessageReactionAdd,

  async execute(reaction: any, user: any, client: client) {

    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    const guildData = await client.database.fetchGuildById(reaction.message.guild.id);

    if (guildData) {
      if (guildData.addons.forumGame.channelsList.includes(reaction.message.channel.id)) {
        client.emit('fg-addRole', reaction, user, guildData, client);
      }
    }
  }
};
