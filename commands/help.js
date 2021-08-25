const { SlashCommandBuilder } = require('@discordjs/builders');
const helpEmbed = require('../util/helpEmbed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List of commands and their description.'),
	async execute(interaction) {
		await interaction.reply('Hope this helps!');
		interaction.channel.send({ embeds: [helpEmbed] });
	},
};