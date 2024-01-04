const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

// dotenv
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

//importação de comandos

const fs = require("node:fs");
const path = require("node:path");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));
client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`Esse comando em ${filePath} está com "data" ou "execute" ausente`
		);
	}
}

// Login do Bot

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error("Comando não encontrado");
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply("Houve um erro ao executar este comando");
	}
});
