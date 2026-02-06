const { Client, GatewayIntentBits } = require("discord.js");
const User = require("../models/user"); // Importa o modelo de usuário do Mongoose
const cooldowns = new Map(); // Armazena último tempo de XP por userId

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Ignora bots e DMs
    if (message.author.bot || !message.guild) return;

    const userId = message.author.id;
    const guildId = message.guild.id;

    // Cooldown de 30 segundos
    const now = Date.now();
    const cooldownAmount = 30 * 1000; // 30s em milissegundos

    if (cooldowns.has(userId)) {
      const expirationTime = cooldowns.get(userId) + cooldownAmount;

      if (now < expirationTime) {
        return; // Ainda em cooldown, não ganha XP
      }
    }

    cooldowns.set(userId, now); // Atualiza cooldown

    try {
      // XP aleatório entre 10-25
      const xpToAdd = Math.floor(Math.random() * 16) + 10;

      let user = await User.findOne({
        userId: userId,
        guildId: guildId,
      });

      if (!user) {
        // Cria novo usuário
        user = new User({
          userId,
          guildId,
          xp: xpToAdd,
          level: 1,
        });
      } else {
        // Adiciona XP
        user.xp += xpToAdd;

        // Verifica level up
        const newLevel = Math.floor(user.xp / 100) + 1;
        if (newLevel > user.level) {
          user.level = newLevel;
          message
            .reply(
              `🎉 **${message.author.username}** subiu para **nível ${user.level}**!`,
            )
            .catch(() => {});
        }
      }

      await user.save();
    } catch (error) {
      console.error("Erro ao processar XP:", error);
    }
  },
};
