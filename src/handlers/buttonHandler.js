const path = require('node:path');
const { srcDir, getFolders, getJsFiles } = require('../util/fileLoader.js');

module.exports = (client) => {
	const buttonsPath = path.join(srcDir, 'buttons');

	for (const folder of getFolders(buttonsPath)) {
		const folderPath = path.join(buttonsPath, folder);

		for (const file of getJsFiles(folderPath)) {
			const filePath = path.join(folderPath, file);
			const button = require(filePath);

			if ('customId' in button && 'execute' in button) {
				client.buttons.set(button.customId, button);
			} else {
				console.log(`[WARNING] The button at ${filePath} is missing required "customId" or "execute" property.`);
			}
		}
	}
};