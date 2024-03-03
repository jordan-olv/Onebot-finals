const { Collection, ChannelType, Events, EmbedBuilder, PermissionsBitField } = require("discord.js");
import { ForumChannel, Guild } from "discord.js";
import { client } from "@client/BotClient";
const gameSchema = require('@schemas/game.js');

module.exports = {
  name: 'fg-addRole',

  async execute(messageReaction: any, user: any, guildData: any, client: client) {

    if (!guildData) return;
    if (!user) return;

    const userId = user.id;

    guildData.addons.forumGame.reactionList.forEach(async (reaction: any) => {
      if (reaction.emoji === messageReaction.emoji.name && reaction.messageId === messageReaction.message.id) {

        const game = await gameSchema.findById(reaction.id_game);

        const role = messageReaction.message.guild.roles.cache.get(game.roleId);
        const member = messageReaction.message.guild.members.cache.get(userId);
        if (member.user.bot) return;
        if (role && member) {
          member.roles.add(role);
        }
        return;
      }
    });
  }
};