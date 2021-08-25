const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Set the total number of pomodoro sessions.')
        .addIntegerOption(option => option.setName('sessions').setDescription('Number of sessions.').setRequired(true)),
	async execute(interaction) {
		// interaction.client.timer.restartTimer(interaction);
        const num_of_sessions = interaction.options.getInteger('sessions');
		if (!interaction.client.timer.running) { // change number of sessions if timer is not running
			await interaction.reply(`${interaction.user} arranged ${num_of_sessions} sessions.`);
		} else {
			await interaction.reply(`Pause the timer and try again.`);
		}
	},
};