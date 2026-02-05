const mongoose = require("mongoose");

// Schema do usuário no Discord
const userSchema = new mongoose.Schema({
  // ID único do usuário no Discord
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  // ID do servidor (guild) onde o usuário está
  guildId: {
    type: String,
    required: true,
  },

  // Pontos de experiência do usuário
  xp: {
    type: Number,
    default: 0,
  },

  // Nível atual (calcula automaticamente: XP / 100)
  level: {
    type: Number,
    default: 1,
  },

  // Quando o usuário foi criado no banco
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Quando o XP foi atualizado pela última vez
  lastXpUpdate: {
    type: Date,
    default: Date.now,
  },
});

// Exportar o modelo
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
