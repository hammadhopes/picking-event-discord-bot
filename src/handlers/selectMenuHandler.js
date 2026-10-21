const path = require('node:path');
const { srcDir, getFolders, getJsFiles } = require('../util/fileLoader.js');

module.exports = (client) => {
	const menusPath = path.join(srcDir, 'selectMenus');

	for (const folder of getFolders(menusPath)) {
		const folderPath = path.join(menusPath, folder);

		for (const file of getJsFiles(folderPath)) {
			const filePath = path.join(folderPath, file);
			const menu = require(filePath);

			if ('customId' in menu && 'execute' in menu) {
				client.selectMenus.set(menu.customId, menu);
			} else {
				console.log(`[WARNING] The select menu at ${filePath} is missing required "customId" or "execute" property.`);
			}
		}
	}
};