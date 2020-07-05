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
                from: 'support@picrossr.com'
            }
        };
    }
}
