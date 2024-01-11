import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {

  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "test"
    ),

  async execute(interaction: any) {

    //let name = interaction.options.getString("command");

    const helpEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Help")
      .setDescription("test");

    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};
