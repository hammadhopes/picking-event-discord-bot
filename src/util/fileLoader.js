const fs = require('node:fs');
const path = require('node:path');

const srcDir = path.resolve(__dirname, '..');

const getFolders = (dir) => {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name);
};

const getJsFiles = (dir) => {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir).filter(file => file.endsWith('.js'));
};

module.exports = { srcDir, getFolders, getJsFiles };