const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Set work time period.')
		.addIntegerOption(option => option.setName('time').setDescription('Number of minutes.').setRequired(true)),
	async execute(interaction) {
		const time = interaction.options.getInteger('time');
		if (!interaction.client.timer.running) { // change work time if timer is not running
			interaction.client.timer.work_time = time;
			interaction.client.timer.work_time_remaining = time * 60000; // in milliseconds
			await interaction.reply(`${interaction.user} set work period to ${time} minutes.`);
		} else {
			await interaction.reply(`Pause the timer and try again.`);
		}
	},
};