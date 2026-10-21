require('dotenv').config();
const connect = require('./database/connect.js');
const loadHandlers = require('./handlers');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('error', (err) => console.error('[Client Error]', err));
process.on('unhandledRejection', (reason) => console.error('[Unhandled Rejection]', reason));

client.commands = new Collection();
client.buttons = new Collection();
client.subCommands = new Collection();
client.selectMenus = new Collection();
client.cooldowns = new Collection();

loadHandlers(client);

(async () => {
	await connect();
	await client.login(process.env.TOKEN);
})();