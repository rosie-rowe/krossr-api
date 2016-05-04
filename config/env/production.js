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
			css: [
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/ng-debounce/angular-debounce.js',
				'public/lib/ngDialog/js/ngDialog.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
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