'use strict';

export class EnvironmentConfigurationDefaults {
    static getDefaults() {
        return {
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
    }
}
