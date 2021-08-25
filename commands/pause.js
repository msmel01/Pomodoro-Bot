const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the pomodoro timer.'),
	async execute(interaction) {
        interaction.client.timer.pauseTimer(interaction);
	},
};