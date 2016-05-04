'use strict';

module.exports = {
	db: {
        name: 'krossr',
        username: 'postgres',
        password: process.env.PG_PWD
    },
	port: process.env.PORT || 3000,
	idappr: process.env.SERVER_ADDR || '127.0.0.1',
	assets: {
		lib: {
			css: [],
			js: []
		},
		css: 'public/dist/application.min.css',
		js: ['public/dist/application.min.js', 'public/dist/lib.min.js']
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