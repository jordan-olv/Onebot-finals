const { Collection, ChannelType, Events, EmbedBuilder, PermissionsBitField } = require("discord.js");
import { AttachmentBuilder, ForumChannel, Guild } from "discord.js";
import { client } from "../../../../BotClient";
const gameSchema = require('../../../../../database/schema/game.js');

module.exports = {
  name: 'gameCreate',

  async execute(game: any, guild: Guild, client: client) {

    if (!guild) return;
    const guildData = await client.database.fetchGuildById(guild.id);
    if (!guildData) return;

    const role = await guild?.roles.create({
      name: game.name,
      color: game.color,
      mentionable: true
    });

    if (!game.name || !game.description || !game.image) return;

    const attachment = new AttachmentBuilder('uploads/' + game.image)
      .setName('image.png');

    const embed = new EmbedBuilder()
      .setTitle(game.name)
      .setDescription(game.description)
      .setColor(game.color)
      .setImage('attachment://image.png')
      .setFooter({ text: 'Cliquez sur la cloche pour avoir les notif du rôle !' });

    const channel = await guild.channels.fetch('1162122644603277312') as ForumChannel;

    const thread = await channel?.threads.create({
      name: game.name,
      message: { embeds: [embed], files: [attachment] },
      reason: 'Création d\'un jeu'
    });

    const firstMessage = await thread.fetchStarterMessage();
    if (firstMessage) {

      const reactAdd = await firstMessage.react('🔔');

      const gameAdd = new gameSchema({
        name: game.name,
        description: game.description,
        image: game.image,
        color: game.color,
        guildId: guild.id,
        messageId: firstMessage.id,
        roleId: role.id,
      });

      await gameAdd.save().catch((err: any) => console.log(err));

      const addReacBdd = {
        id_game: gameAdd._id,
        messageId: firstMessage.id,
        emoji: reactAdd.emoji.id || reactAdd.emoji.name,
        roleId: role.id
      }

      if (!guildData.addons.forumGame.channelsList) guildData.addons.forumGame.channelsList = new Collection();
      if (!guildData.addons.forumGame.reactionList) guildData.addons.forumGame.reactionList = new Collection();

      if (!guildData.addons.forumGame.channelsList.includes(thread.id)) {
        guildData.addons.forumGame.channelsList.push(thread.id);
      }

      guildData.addons.forumGame.reactionList.push(addReacBdd);
      guildData.markModified("addons.forumGame");
      guildData.save();
    }
  }
};