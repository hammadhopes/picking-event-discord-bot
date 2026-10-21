const path = require('node:path');
const { Collection } = require('discord.js');
const { srcDir, getFolders, getJsFiles } = require('../util/fileLoader.js');

module.exports = (client) => {
	const subCommandsPath = path.join(srcDir, 'subCommands');

	for (const folder of getFolders(subCommandsPath)) {
		const folderPath = path.join(subCommandsPath, folder);

		for (const file of getJsFiles(folderPath)) {
			const subCommand = require(path.join(folderPath, file));
			const subCommandName = path.basename(file, '.js');

			if (!client.subCommands.has(folder)) {
				client.subCommands.set(folder, new Collection());
			}
			client.subCommands.get(folder).set(subCommandName, subCommand);
		}
	}
};