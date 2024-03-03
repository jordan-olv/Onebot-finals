const { Events } = require("discord.js");
import { ChannelType } from "discord.js";
import { client } from "../../../../BotClient";

module.exports = {
  name: Events.VoiceStateUpdate,

  async execute(oldMember: any, newMember: any, client: client) {
    console.log(oldMember, newMember, client)

    const guild = oldMember || newMember;
    //const channelId = oldMember.channelId || newMember.channelId;
    const guildData = await client.database.fetchGuild(guild);

    if (guildData) {
      if (newMember.channel) {
        const channelId = newMember.channelId;
        if (guildData.addons.createVoc.channels.includes(channelId)) {
          client.emit("addVoiceChannel", newMember, guildData, client);
        }
      }

      if (oldMember.channel) {
        if (guildData.addons.createVoc.channelsList.includes(oldMember.channelId)) {
          client.emit("removeVoiceChannel", oldMember, guildData, client);
        }
      }
    }

  }

};
/* client.on("voiceStateUpdate", async (oldMember, newMember) => {
  let guildData = await client.Database.fetchGuild(oldMember);

  //ON SUPPRIME LES CHANNELS VIDE
  if (oldMember.channel) {
    guildData.addons.createVoc.channelsList.forEach(async (item) => {
      const channel = oldMember.guild.channels.cache.get(item);
      if (channel) {
        if (channel.members.size <= 0) {
          await channel.delete();
          //REMOVE DE MONGO
          const findId = (element) => element == item;
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
  //CREATE CHANNEL
  if (newMember.channel) {
    if (guildData.addons.createVoc.channels.includes(newMember.channelId)) {
      guildData.addons.createVoc.nbVoc++;
      const nbrevoc = guildData.addons.createVoc.nbVoc;
      const channel = await newMember.guild.channels.create({
        name: `Voc #${guildData.addons.createVoc.nbVoc}`,
        type: ChannelType.GuildVoice,
        parent: newMember.channel.parentId,
      });

      await newMember.member.voice.setChannel(channel);
      guildData.addons.createVoc.channelsList.push(channel.id);
      guildData.markModified("addons.createVoc");
      guildData.save();

      const embVoc = new EmbedBuilder()
        .setTitle(`<:vocIcon:1017440664646058026> Voc #${nbrevoc}`)
        .addFields(
          {
            name: "Owner <:barreVoc:1017439551817527459>",
            value: newMember.member.user.username,
            inline: true,
          },
          {
            name: "Slot <:barreVoc:1017439551817527459>",
            value: "∞",
            inline: true,
          }
        )
        .setColor(guildData.config.color.main)
        .setThumbnail(newMember.member.user.displayAvatarURL())
        .setImage(
          "https://cdn.discordapp.com/attachments/866728669811572766/937850523497943060/imgvoc.png"
        );

      const Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("vocname")
          .setLabel("Change Name")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("vocslot")
          .setLabel("Change Slot")
          .setStyle(ButtonStyle.Success)
      );

      let msgEmbedVoc = await newMember.member.send({ embeds: [embVoc], components: [Row] });

      const filterReaction = (reaction, user) =>
        user.id === newMember.member.id && !user.bot;
      const filterMessage = (m) =>
        m.author.id === newMember.member.id && !m.author.bot;
      const collectionReaction = msgEmbedVoc.createMessageComponentCollector({
        filterReaction,
        time: 30000,
      });
      collectionReaction.on("collect", async (reaction, user) => {
        reaction.deferUpdate();
        switch (reaction.customId) {
          case "vocname":
            const msgQuestionTitle = await newMember.member.send(
              "Quel nom souhaitez-vous mettre ?\n**(Tu peux changer 2 fois toutes les 10 minutes)**"
            );
            const title = (
              await msgQuestionTitle.channel.awaitMessages({
                filter: filterMessage,
                max: 1,
                time: 60000,
              })
            ).first();
            await msgQuestionTitle.delete();
            embVoc.data.title = `<:vocIcon:1017440664646058026> ${title.content}`;
            channel.setName(title.content);
            msgEmbedVoc.edit({ embeds: [embVoc] });
            break;
          case "vocslot":
            const msgQuestionSlot = await newMember.member.send(
              "Combien de slot souhaitez-vous ? **(entre 1 et 99)**"
            );
            const slot = (
              await msgQuestionSlot.channel.awaitMessages({
                filter: filterMessage,
                max: 1,
                time: 60000,
              })
            ).first();
            msgQuestionSlot.delete();
            if (slot.content < 1 || slot.content > 99) {
              const TooSlot = await newMember.member.send(
                "Entre 1 et 99 j'ai dit !\nRecommence"
              );
              setTimeout(() => {
                TooSlot.delete();
              }, 5000);
            } else {
              embVoc.data.fields[1].value = slot.content;
              channel.setUserLimit(slot.content);
              msgEmbedVoc.edit({ embeds: [embVoc] });
            }
            break;
        }
      });
    }
  }

  // if (change) {
  //   change = false;
  //   guildData.markModified("addons.createVoc");
  //   guildData.save();
  // }
}); */