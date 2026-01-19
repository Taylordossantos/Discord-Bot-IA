const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com pong! 🏓"),

  async execute(interaction) {
    const latency = interaction.client.ws.ping;

    await interaction.reply({
      content: `🏓 Pong! Latência: ${latency}ms`,
    });
  },
};
