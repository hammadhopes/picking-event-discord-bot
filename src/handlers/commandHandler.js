const path = require('node:path');
const { srcDir, getFolders, getJsFiles } = require('../util/fileLoader.js');

module.exports = (client) => {
	const foldersPath = path.join(srcDir, 'commands');

	for (const folder of getFolders(foldersPath)) {
		const commandsPath = path.join(foldersPath, folder);

		for (const file of getJsFiles(commandsPath)) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property.`);
			}
		}
	}
};