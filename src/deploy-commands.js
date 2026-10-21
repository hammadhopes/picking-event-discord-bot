require('dotenv').config();
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config/misc.json');
const { srcDir, getFolders, getJsFiles } = require('./util/fileLoader.js');

if (!process.env.TOKEN) {
	console.error('[DEPLOY] TOKEN is missing in your .env file.');
	process.exit(1);
}

const commands = [];
const foldersPath = path.join(srcDir, 'commands');

for (const folder of getFolders(foldersPath)) {
	const commandsPath = path.join(foldersPath, folder);

	for (const file of getJsFiles(commandsPath)) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error('[DEPLOY] Failed to deploy commands:', error);
		process.exit(1);
	}
})();