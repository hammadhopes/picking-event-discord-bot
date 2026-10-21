const { Events, MessageFlags, PermissionFlagsBits } = require('discord.js');
const { getErrorContainer } = require('../util/responseContainers.js'); 
const perms = require('../config/permission.json');

const errorPayload = (text) => ({
    components: [getErrorContainer(text)],
    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
});

async function replyError(interaction, text) {
    try {
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorPayload(text));
        } else {
            await interaction.reply(errorPayload(text));
        }
    } catch (err) {
        console.error('Failed to send error reply:', err);
    }
}

async function runComponent(interaction, collection, label) {
    const component = collection.get(interaction.customId);

    if (!component) {
        console.error(`No ${label} with ID "${interaction.customId}" was found.`);
        return;
    }

    try {
        await component.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${label} "${interaction.customId}":`, error);
        await replyError(interaction, `There was an error while executing this ${label}!`);
    }
}

async function runCommand(interaction) {
    const { client } = interaction;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching "${interaction.commandName}" was found.`);
        return;
    }

    if (!interaction.inGuild()) {
        return replyError(interaction, 'This command can only be used in a server!');
    }

    // -- PERMISSION --
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        const requiredRoles = perms[command.data.name];

        if (requiredRoles && !interaction.member.roles.cache.some(role => requiredRoles.includes(role.id))) {
            return replyError(interaction, `You don't have permission to use this command!`);
        }
    }
    // -- --

    // -- COOLDOWN --
    const { cooldowns } = client;

    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const cooldownAmount = (command.cooldown ?? 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return replyError(interaction, `Wait! You can use this command again <t:${expiredTimestamp}:R>!`);
        }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    // -- --

    try {
        const subCommandName = interaction.options.getSubcommand(false); 
        const subCommand = subCommandName
            ? client.subCommands.get(command.data.name)?.get(subCommandName)
            : null;

        await (subCommand ?? command).execute(interaction);
    } catch (error) {
        console.error(`Error executing command "${interaction.commandName}":`, error);
        await replyError(interaction, 'There was an error while executing this command!');
    }
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            await runCommand(interaction);
        } else if (interaction.isButton()) {
            await runComponent(interaction, interaction.client.buttons, 'button');
        } else if (interaction.isStringSelectMenu()) {
            await runComponent(interaction, interaction.client.selectMenus, 'select menu');
        }
    },
};