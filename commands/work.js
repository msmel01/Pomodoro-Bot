const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Set work time period.')
		.addIntegerOption(option => option.setName('time').setDescription('Number of minutes.').setRequired(true)),
	async execute(interaction) {
		const time = interaction.options.getInteger('time');
		interaction.client.work_time = time;
		await interaction.reply(`${interaction.user} set work period to ${time} minutes.`);
	},
};