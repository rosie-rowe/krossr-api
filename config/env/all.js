'use strict';

module.exports = {
	app: {
		title: 'krossr',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	minPasswordLength: 10,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				//'public/lib/bootstrap/dist/css/bootstrap.css'
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
				'public/lib/angular-timer/app/js/timer.js',
				'public/lib/angular-timer/app/js/i18nService.js',
				'public/lib/ng-debounce/angular-debounce.js',
				'public/lib/ngDialog/js/ngDialog.js',
				'public/lib/humanize-duration/humanize-duration.js',
				'public/lib/momentjs/min/moment.min.js',
				'public/lib/momentjs/min/locales.min.js'
			]
		},
		css: [
			'public/less/reset.css',
			'public/less/modules.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};