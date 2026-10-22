const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('captain')
		.setDescription('Manage team captains')
		.addSubcommand(subcommand =>
			subcommand
				.setName('select')
				.setDescription('Select captains'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('random')
				.setDescription('Select random captains')
				.addRoleOption(option =>
					option
						.setName('role1')
						.setDescription('First role to select captains from')
						.setRequired(false))
				.addRoleOption(option =>
					option
						.setName('role2')
						.setDescription('Second role to select captains from')
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Add a user to the captains')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('User to add as captain')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a user from the captains')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('User to remove as captain')
						.setRequired(true))),
	async execute(interaction) {
		await interaction.reply({
			content: 'This captain command is not implemented yet.',
			flags: MessageFlags.Ephemeral,
		});
	},
};
