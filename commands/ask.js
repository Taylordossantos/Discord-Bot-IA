const { SlashCommandBuilder } = require("discord.js");
const Groq = require("groq-sdk");

// Inicializar cliente Groq com chave de API do .env
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Faça uma pergunta à IA!")
    .addStringOption((option) =>
      option
        .setName("pergunta")
        .setDescription("Sua pergunta para a IA")
        .setRequired(true),
    ),

  async execute(interaction) {
    const pergunta = interaction.options.getString("pergunta");

    await interaction.deferReply();

    try {
      // Usar llama-3.3-70b-versatile que está ativo e funcionando
      const message = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: pergunta,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      const resposta = message.choices[0].message.content;

      // Discord limita mensagens a 2000 caracteres
      if (resposta.length > 2000) {
        const respostaCortada = resposta.substring(0, 1997) + "...";
        await interaction.editReply({
          content: `🤖 **Resposta da IA:**\n\n${respostaCortada}`,
        });
      } else {
        await interaction.editReply({
          content: `🤖 **Resposta da IA:**\n\n${resposta}`,
        });
      }
    } catch (error) {
      console.error("❌ Erro ao chamar Groq API:", error);

      if (error.message.includes("429")) {
        await interaction.editReply(
          "⚠️ Muitas requisições! Aguarde um momento antes de tentar novamente.",
        );
      } else if (error.message.includes("401")) {
        await interaction.editReply(
          "❌ Erro de autenticação com a API do Groq. Verifique suas chaves.",
        );
      } else {
        await interaction.editReply(
          "❌ Erro ao processar sua pergunta. Tente novamente!",
        );
      }
    }
  },
};
