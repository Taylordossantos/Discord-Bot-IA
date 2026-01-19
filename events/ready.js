module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`\n✅ Bot conectado como ${client.user.tag}`);
    console.log(
      `📊 Pronto para servir ${client.guilds.cache.size} servidores\n`,
    );

    // Setar status do bot
    client.user.setActivity("seu servidor 🤖", { type: "WATCHING" });
  },
};
