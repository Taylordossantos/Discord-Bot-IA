US-EN
# 🤖 Discord BOT-AI

### XP System + Groq LLM Integration

A Discord bot built with **Node.js + Discord.js** that combines:

* User progression through an **XP/level system**
* Server ranking
* Integration with **Large Language Models via Groq API**

Modular event-driven architecture with MongoDB persistence and dynamic command loading.

---

## ✨ Features

### 🎮 XP Progression

* Gain **10–25 XP per message**
* Anti-spam cooldown of **30 seconds**
* Automatic level-up (`100 XP → next level`)
* MongoDB persistence per server
* Automatic level-up notification

Commands:

| Command    | Description                   |
| ---------- | ----------------------------- |
| `/profile` | Displays current level and XP |
| `/rank`    | Shows server ranking          |
| `/ping`    | Latency test                  |

---

### 🧠 AI Integration

* Ask questions via Slash Command
* Powered by **Groq SDK**
* Model used:

```
llama-3.3-70b-versatile
```

Command:

| Command | Description         |
| ------- | ------------------- |
| `/ask`  | Sends prompt to LLM |

Capabilities:

* Automatic response truncation for Discord limits
* HTTP error handling
* Friendly feedback for rate limits and auth issues

---

## 🧠 Architecture

```
index.js
 ├── Dynamic event loader
 ├── Dynamic command loader
 ├── MongoDB connection
 └── Discord login

events/
 ├── messageCreate → XP Engine
 ├── interactionCreate → Slash Router
 └── ready → Startup log

commands/
 ├── ask → Groq LLM
 ├── profile → User status
 ├── ping
 └── rank

models/
 └── User schema (Mongoose)
```

XP Flow:

```
Message → cooldown validation
        → random XP calculation
        → Mongo update
        → level-up check
```

AI Flow:

```
/ask → Groq API → response → size validation → Discord reply
```

---

## 🛠 Tech Stack

* Node.js (CommonJS)
* Discord.js v14
* MongoDB
* Mongoose ODM
* Groq SDK
* dotenv

Additional dependencies:

* axios
* @google/generative-ai *(installed but currently unused)*

---

## ⚙️ Requirements

* Node.js installed
* MongoDB local or Atlas
* Discord bot configured in Developer Portal
* Groq API key

---

## 🚀 Installation

```bash
git clone https://github.com/Taylordossantos/Discord-BOT-IA
cd Discord-BOT-IA

npm install

cp .env.example .env
# configure variables

npm start
```

---

## 🔐 Environment Configuration

```env
DISCORD_TOKEN=your_token
MONGODB_URI=mongodb://localhost:27017/bot_ia
GROQ_API_KEY=your_groq_key
```

---

## 📁 Project Structure

```txt
Discord-BOT-IA/
├── commands/
│   ├── ask.js
│   ├── ping.js
│   └── profile.js
├── events/
│   ├── interactionCreate.js
│   ├── messageCreate.js
│   └── ready.js
├── models/
│   └── user.js
├── config/
│   └── registerCommands.js
├── index.js
└── package.json
```

---

## 🧪 Example Usage

```
User sends message
→ +18 XP

/profile
→ Level 2 (178 XP)

/ask "Capital of Brazil?"
→ Brasília
```

---

## 📈 Project Status

### Implemented

* XP engine
* Mongo persistence
* Slash commands
* Groq integration
* Basic error handling

### Possible Improvements

* Conversational memory
* Server-specific configuration
* Auto roles by level
* Web dashboard
* Docker deployment
* AI response caching
* Automated tests

---

## 🤝 Contributing

Pull requests are welcome:

1️⃣ Fork
2️⃣ Create branch (`feat/new-feature`)
3️⃣ Commit
4️⃣ Open PR

---

## 📄 License

ISC

---

## 👨‍💻 Author

Taylor dos Santos
GitHub
Linkedin | www.linkedin.com/in/taylor-dos-santos





PT-BR
# 🤖 Discord BOT-IA

### XP System + Integração LLM via Groq

Bot para Discord construído em **Node.js + Discord.js** que combina:

* Sistema de progressão por **XP e níveis**
* Ranking de usuários
* Integração com **LLM (Groq API)** via comando Slash

Arquitetura modular baseada em eventos, persistência MongoDB e carregamento dinâmico de comandos.

---

## ✨ Principais Funcionalidades

### 🎮 Progressão (XP)

* Ganho de **10–25 XP por mensagem**
* Cooldown anti-spam de **30 segundos**
* Level up automático (`100 XP → próximo nível`)
* Persistência por servidor via MongoDB
* Notificação automática de level up

Comandos:

| Comando    | Descrição              |
| ---------- | ---------------------- |
| `/profile` | Exibe nível e XP atual |
| `/rank`    | Ranking Top usuários   |
| `/ping`    | Teste de latência      |

---

### 🧠 Inteligência Artificial

* Perguntas via Slash Command
* Integração com **Groq SDK**
* Modelo usado:

```
llama-3.3-70b-versatile
```

Comando:

| Comando | Descrição                    |
| ------- | ---------------------------- |
| `/ask`  | Envia pergunta ao modelo LLM |

Recursos:

* Resposta truncada automaticamente se exceder limite Discord
* Tratamento de erros HTTP
* Mensagens amigáveis para rate limit e autenticação

---

## 🧠 Arquitetura

```
index.js
 ├── Loader dinâmico de eventos
 ├── Loader dinâmico de comandos
 ├── Conexão MongoDB
 └── Login Discord

events/
 ├── messageCreate → XP Engine
 ├── interactionCreate → Router Slash
 └── ready → Boot Log

commands/
 ├── ask → Groq LLM
 ├── profile → Status usuário
 ├── ping
 └── rank

models/
 └── user schema (Mongoose)
```

Fluxo XP:

```
Mensagem → valida cooldown
        → calcula XP random
        → atualiza Mongo
        → verifica level up
```

Fluxo IA:

```
/ask → Groq API → resposta → valida tamanho → Discord reply
```

---

## 🛠 Stack Tecnológica

* Node.js (CommonJS)
* Discord.js v14
* MongoDB
* Mongoose ODM
* Groq SDK
* dotenv

Dependências adicionais:

* axios
* @google/generative-ai *(presente no projeto — não utilizado atualmente)*

---

## ⚙️ Pré-requisitos

* Node.js instalado
* MongoDB local ou Atlas
* Bot configurado no Discord Developer Portal
* Token Groq API

---

## 🚀 Instalação

```bash
git clone https://github.com/Taylordossantos/Discord-BOT-IA
cd Discord-BOT-IA

npm install

cp .env.example .env
# configure variáveis

npm start
```

---

## 🔐 Configuração `.env`

```env
DISCORD_TOKEN=seu_token
MONGODB_URI=mongodb://localhost:27017/bot_ia
GROQ_API_KEY=sua_chave_groq
```

---

## 📁 Estrutura do Projeto

```txt
Discord-BOT-IA/
├── commands/
│   ├── ask.js
│   ├── ping.js
│   └── profile.js
├── events/
│   ├── interactionCreate.js
│   ├── messageCreate.js
│   └── ready.js
├── models/
│   └── user.js
├── config/
│   └── registerCommands.js
├── index.js
└── package.json
```

---

## 🧪 Exemplo de Uso

```
Usuário envia mensagem
→ +18 XP

/profile
→ Level 2 (178 XP)

 /ask "Capital do Brasil?"
→ Brasília
```

---

## 📈 Status do Projeto

### Implementado

* XP engine completo
* Persistência Mongo
* Slash commands
* Integração Groq
* Tratamento de erros básicos

### Possíveis Evoluções

* Memória conversacional
* Configuração por servidor
* Roles automáticas por nível
* Dashboard Web
* Deploy Docker
* Cache de respostas IA
* Testes automatizados

---

## 🤝 Contribuição

Pull Requests são bem-vindos:

1️⃣ Fork
2️⃣ Branch (`feat/nova-feature`)
3️⃣ Commit
4️⃣ PR

---

## 📄 Licença

ISC

---

## 👨‍💻 Autor

Taylor dos Santos
GitHub
Linkedin www.linkedin.com/in/taylor-dos-santos



