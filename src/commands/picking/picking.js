const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('picking')
		.setDescription('Manage picking events and player picks')
		.addSubcommand(subcommand =>
			subcommand
				.setName('initiate')
				.setDescription('Create a new picking event'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('terminate')
				.setDescription('End the current picking event')
				.addStringOption(option =>
					option
						.setName('team')
						.setDescription('Winning team')
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reinitiate')
				.setDescription('Reinitialize the current picking event'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('start')
				.setDescription('Start the picking process'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('end')
				.setDescription('End the picking process'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('restart')
				.setDescription('Restart the picking process'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Add a user or a role to the picking event')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('User to add')
						.setRequired(false))
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('Role to add')
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a user or a role from the picking event')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('User to remove')
						.setRequired(false))
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('Role to remove')
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('pause')
				.setDescription('Pause the picking process'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('undo')
				.setDescription('Undo a number of recent picks')
				.addIntegerOption(option =>
					option
						.setName('picks')
						.setDescription('Number of recent picks to undo')
						.setMinValue(1)
						.setRequired(false))),
	async execute(interaction) {
		await interaction.reply({
			content: 'This picking command is not implemented yet.',
			flags: MessageFlags.Ephemeral,
		});
	},
};
