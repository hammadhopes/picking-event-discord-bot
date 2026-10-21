const loadCommands = require('./commandHandler.js');
const loadSubCommands = require('./subCommandHandler.js');
const loadButtons = require('./buttonHandler.js');
const loadSelectMenus = require('./selectMenuHandler.js');
const loadEvents = require('./eventHandler.js');

module.exports = (client) => {
	loadCommands(client);
	loadSubCommands(client);
	loadButtons(client);
	loadSelectMenus(client);
	loadEvents(client);
};