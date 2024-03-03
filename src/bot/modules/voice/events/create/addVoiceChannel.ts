const { Events } = require("discord.js");
import { ChannelType } from "discord.js";
import { client } from "@client/BotClient";

module.exports = {
  name: "addVoiceChannel",

  async execute(newMember: any, guildData: any, client: client) {

    const channelId = newMember.channelId;
    if (guildData.addons.createVoc.channels.includes(channelId)) {
      guildData.addons.createVoc.nbVoc++;
      const nbrevoc = guildData.addons.createVoc.nbVoc;
      const channel = await newMember.guild.channels.create({
        name: `Voc #${nbrevoc}`,
        type: ChannelType.GuildVoice,
        parent: newMember.channel.parentId,
      });

      await newMember.member.voice.setChannel(channel);
      guildData.addons.createVoc.channelsList.push(channel.id);
      guildData.markModified("addons.createVoc");
      guildData.save();
    }
  }
};
