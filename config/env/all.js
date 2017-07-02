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
			css: [],
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
				'public/lib/ngDialog/js/ngDialog.js',
			]
		},
		css: [
			'public/less/reset.css',
			'public/less/modules.css'
		],
		js: [
			'public/typescript/config.js',
			'public/typescript/application.js',
			'public/typescript/**/*.module.js',
            'public/typescript/**/!(*.test).js',
            'public/dist/templates.js'
		],
        html: [
            'public/modules/**/*.html'
        ],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/**/*.test.ts'
		],
        typescript: [
			'public/config.ts',
			'public/application.ts',
            'public/modules/**/*.ts'
        ],
        typescriptRefs: [
            'public/modules/*/typings/*.d.ts',
            'public/typings/**/*.d.ts'
        ]
	},
    mailer: {
        from: 'support@krossr.com',
        options: {
            service: 'mailgun',
            auth: {
                api_key: process.env.MAILER_API_KEY, // jshint ignore:line
                domain: 'mg.krossr.com',
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        }
    }
};