const User = require("..user.js");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    // Ignorar mensagens de bot
    if (message.author.bot) return;

    // Ignorar mensagens em DM
    if (!message.guild) return;

    try {
      // Procurar usuário no banco de dados
      let user = await User.findOne({
        userId: message.author.id,
        guildId: message.guild.id,
      });

      // Se não existe, criar novo usuário
      if (!user) {
        user = await User.create({
          userId: message.author.id,
          guildId: message.guild.id,
          xp: 0,
          level: 1,
        });
      }

      // Ganhar 1-5 XP aleatório por mensagem
      const xpGanho = Math.floor(Math.random() * 5) + 1;
      user.xp += xpGanho;

      // Calcular novo nível (XP / 100 = nível)
      const novoLevel = Math.floor(user.xp / 100) + 1;

      // Se subiu de nível, notificar
      if (novoLevel > user.level) {
        user.level = novoLevel;
        message.reply(
          `🎉 Parabéns **${message.author.username}**! Você subiu para o **nível ${novoLevel}**!`,
        );
      }

      // Atualizar data da última vez que ganhou XP
      user.lastXpUpdate = new Date();

      // Salvar no banco
      await user.save();
    } catch (error) {
      console.error("❌ Erro ao ganhar XP:", error);
    }
  },
};
