const path = require('node:path');
const { srcDir, getJsFiles } = require('../util/fileLoader.js');

module.exports = (client) => {
	const eventsPath = path.join(srcDir, 'events');

	for (const file of getJsFiles(eventsPath)) {
		const event = require(path.join(eventsPath, file));

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
};