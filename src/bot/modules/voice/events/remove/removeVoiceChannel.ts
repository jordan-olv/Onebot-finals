const { Events } = require("discord.js");
import { ChannelType } from "discord.js";
import { client } from "@client/BotClient";

module.exports = {
  name: "removeVoiceChannel",

  async execute(oldMember: any, guildData: any, client: client) {

    guildData.addons.createVoc.channelsList.forEach(async (item: any) => {
      const channel = oldMember.guild.channels.cache.get(item);
      if (channel) {
        if (channel.members.size <= 0) {
          await channel.delete();
          //REMOVE DE MONGO
          const findId = (element: any) => element == item;
          const index =
            guildData.addons.createVoc.channelsList.findIndex(findId);

          if (index != -1) {
            guildData.addons.createVoc.channelsList.splice(index, 1);
            guildData.markModified("addons.createVoc");
            guildData.save();
          }
        }
      }
    });

  }
};
