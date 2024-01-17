const { Collection, ChannelType, Events, EmbedBuilder, PermissionsBitField } = require("discord.js");
import { client } from "../../../../BotClient";

module.exports = {
  name: Events.MessageCreate,

  async execute(message: any, client: client) {
    
    if (message.channel.type !== 0) return;
    if (message.author.bot) return;
    if (!message.guild) return;

    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    let command = client.commands.get(cmd);
    if (!command) return;

    if (command) {
      if (command.permissions) {
        if (
          !message.member.permissions.has(
            PermissionsBitField.resolve(command.permissions || [])
          )
        )
          return message.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `🚫 Désolé, tu n'as pas les permissions pour cette commande.`
                )
                .setColor("Red"),
            ],
          });
      }

      try {
        await message.delete();
        await command.execute(client, message, args);
      }
      catch (err) {
        console.error(err);
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `🚫 Désolé, il y a eu une erreur lors de l'exécution de cette commande.`
              )
              .setColor("Red"),
          ],
        });
      }
    }
  }
};