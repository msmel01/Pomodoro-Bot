const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('break')
		.setDescription('Set break time period.')
		.addIntegerOption(option => option.setName('time').setDescription('Number of minutes.').setRequired(true)),
	async execute(interaction) {
		const time = interaction.options.getInteger('time');
		if (!interaction.client.timer.running) { // change work time if timer is not running
			interaction.client.timer.break_time = time;
			interaction.client.timer.break_time_remaining = time * 60000; // in milliseconds
			await interaction.reply(`${interaction.user} set break period to ${time} minutes.`);
		} else {
			await interaction.reply(`Pause the timer and try again.`);
		}
		
	},
};