const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("playlist")
		.setDescription("Ouça a melhor playlist de estudo!"),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};
