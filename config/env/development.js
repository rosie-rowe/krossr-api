'use strict';

module.exports = {
	db: {
		name: 'postgres',
		username: 'brian',
		password: 'postgres123!',
		host: 'localhost'
	},
	enableSequelizeLog: 'true',
//	FORCE_DB_SYNC: 'true',
	app: {
		title: 'krossr - Development Environment'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};