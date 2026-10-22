const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pick')
		.setDescription('Pick a user')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('User to pick')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({
			content: 'This pick command is not implemented yet.',
			flags: MessageFlags.Ephemeral,
		});
	},
};
