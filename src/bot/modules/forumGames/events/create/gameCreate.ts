const { Collection, ChannelType, Events, EmbedBuilder, PermissionsBitField } = require("discord.js");
import { ForumChannel, Guild } from "discord.js";
import { client } from "../../../../BotClient";
const gameSchema = require('../database/schema/game.js');

module.exports = {
  name: 'gameCreate',

  async execute(game: Game, guild: Guild, client: client) {

    if (!guild) return;

    const role = await guild?.roles.create({
      name: game.name,
      color: game.color,
      mentionable: true
    });

    const embed = new EmbedBuilder()
      .setTitle(game.name)
      .setDescription(game.description)
      .setColor(game.color)
      //.setThumbnail(game.image)
      .setFooter({ text: 'Cliquez sur la cloche pour avoir les notif du rôle !' });

    const channel = await guild.channels.fetch('1162122644603277312') as ForumChannel;

    const thread = await channel?.threads.create({
      name: game.name,
      message: { embeds: [embed] },
      reason: 'Création d\'un jeu'
    });
    
    const msg = await thread.fetchStarterMessage();
    const reactAdd = await msg?.react('🔔');

    const game = new gameSchema({
      name: gameName,
      description: gameDescription,
      image: gameImage,
      color: gameColor,
      messageId: '',
      roleId: '',
    });
  
    //await game.save().catch((err: any) => console.log(err));

    console.log(channel);
    /*     const newThread = await channel?.threads.create({
          name: game.name,
          type: "GUILD_PUBLIC_THREAD",
          message: { embeds: [embed] },
          reason: 'Création d\'un jeu'
        }); */

  }
};