const { SlashCommandBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Mostra seu nível e XP no servidor"),

  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const guildId = interaction.guild.id;

      // Busca o usuário no banco
      let user = await User.findOne({ userId, guildId });

      // Se nunca ganhou XP, cria registro padrão
      if (!user) {
        user = await User.create({
          userId,
          guildId,
          xp: 0,
          level: 1,
        });
      }

      const xpAtual = user.xp;
      const levelAtual = user.level;

      // Regra: cada nível precisa de 100 XP
      const xpParaProximoLevel = levelAtual * 100;
      const xpFaltando = xpParaProximoLevel - (xpAtual % 100);

      await interaction.reply({
        content:
          `📊 **Perfil de ${interaction.user.username}**\n` +
          `\n🏅 Nível: **${levelAtual}**` +
          `\n✨ XP total: **${xpAtual}**` +
          `\n⬆️ XP para o próximo nível: **${xpFaltando}**`,
        ephemeral: false, // se quiser só o usuário ver, troque para true
      });
    } catch (error) {
      console.error("❌ Erro no comando /profile:", error);
      await interaction.reply({
        content: "❌ Erro ao buscar seu perfil. Tente novamente mais tarde.",
        ephemeral: true,
      });
    }
  },
};
