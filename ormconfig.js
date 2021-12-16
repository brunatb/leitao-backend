/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	migrationsTableName: 'migrations',
	entities: ['src/entities/*.ts'],
	migrations: ['src/migrations/*.ts'],
	ssl: {
		rejectUnauthorized: false,
	},
	cli: {
		migrationsDir: 'src/migrations',
		entitiesDir: 'src/entities/*.ts',
	},
};
