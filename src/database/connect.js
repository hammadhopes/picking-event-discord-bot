require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async function connect() {
	const uri = process.env.MONGO_URI;

	if (!uri) {
		console.error('[DB] MONGO_URI is missing in your .env file.');
		process.exit(1);
	}

	mongoose.connection.on('disconnected', () => {
		console.warn('[DB] MongoDB disconnected.');
	});
	mongoose.connection.on('reconnected', () => {
		console.log('[DB] MongoDB reconnected.');
	});
	mongoose.connection.on('error', (err) => {
		console.error('[DB] MongoDB error:', err.message);
	});

	try {
		await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 10000, 
		});
		console.log(`[DB] Connected to MongoDB (${mongoose.connection.name}).`);
	} catch (err) {
		console.error('[DB] Initial connection failed:', err.message);
		process.exit(1);
	}
};