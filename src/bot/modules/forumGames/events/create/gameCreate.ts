import { Guild } from "discord.js";


const { Collection, ChannelType, Events, EmbedBuilder, PermissionsBitField } = require("discord.js");


module.exports = {
  name: Events.gameCreate,

  async execute(game, guild: Guild) {

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

    const channel = await guild.channels.fetch('1162122644603277312');
    console.log(channel);
    /*     const newThread = await channel?.threads.create({
          name: game.name,
          type: "GUILD_PUBLIC_THREAD",
          message: { embeds: [embed] },
          reason: 'Création d\'un jeu'
        }); */

  }
};