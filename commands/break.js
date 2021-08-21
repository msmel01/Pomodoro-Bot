const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('break')
		.setDescription('Set break time period.')
		.addIntegerOption(option => option.setName('time').setDescription('Number of minutes.').setRequired(true)),
	async execute(interaction) {
		const time = interaction.options.getInteger('time');
		interaction.client.break_time = time;
		await interaction.reply(`${interaction.user} set break period to ${time} minutes.`);
	},
};