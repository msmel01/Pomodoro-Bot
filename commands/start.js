const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starting the pomodoro timer.'),
	async execute(interaction) {
		interaction.client.timer.startTimer(interaction);
	},
};