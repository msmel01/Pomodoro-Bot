const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restart the pomodoro timer.'),
	async execute(interaction) {
		interaction.client.timer.restartTimer(interaction);
	},
};