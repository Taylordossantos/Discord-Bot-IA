const { Client, Collection, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Carregar variáveis de ambiente
dotenv.config();

// Criar cliente do Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Coleção para armazenar comandos
client.commands = new Collection();

// ===== CARREGAR EVENTOS =====
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

console.log(`✅ ${eventFiles.length} eventos carregados`);

// ===== CARREGAR COMANDOS =====
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`⚠️  Comando ${file} não tem 'data' ou 'execute'`);
  }
}

console.log(`✅ ${commandFiles.length} comandos carregados`);

// ===== CONECTAR AO DISCORD =====
client.login(process.env.DISCORD_TOKEN);

// Tratamento de erros
process.on("unhandledRejection", (error) => {
  console.error("❌ Erro não tratado:", error);
});
