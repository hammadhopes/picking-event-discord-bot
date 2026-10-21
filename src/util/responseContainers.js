const { ContainerBuilder, TextDisplayBuilder } = require('discord.js');
const { checkEmoji, crossEmoji } = require("../config/emojis.json");

const getSuccessContainer = (message) => {
    return new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`${checkEmoji} **${message}**`)
        );
};

const getErrorContainer = (message) => {
    return new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`${crossEmoji} **${message}**`)
        );
};

module.exports = { getSuccessContainer, getErrorContainer};

