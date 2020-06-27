'use strict';

let fs = require('fs');

import * as _ from 'lodash';
import * as path from 'path';
import { WinstonConfiguration } from './winston';
import { Sequelize } from 'sequelize';
import { EnvironmentConfiguration } from './config';
import * as sequelize from 'sequelize';

let config = EnvironmentConfiguration.getConfiguration();
let winston = WinstonConfiguration.initialize();

export class SequelizeConfiguration {
    static initialize() {
        let db: { sequelize?: sequelize.Sequelize } = {};

        winston.info('Initializing Sequelize...');

        let rootPath = path.normalize(__dirname + '/..');
        let modelsDir = rootPath + '/app/models';

        // create your instance of sequelize
        let sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: 'postgres'
        });

        // loop through all files in models directory ignoring hidden files and this file
        fs.readdirSync(modelsDir)
            .filter(function(file) {
                return (file.indexOf('.') !== 0) && (file !== 'index.js');
            })
            // use js output, not ts input
            .map((file: string) => file.substring(0, file.length - 2) + 'js')
            // import model files and save model names
            .forEach(function(file) {
                winston.info('Loading model file ' + file);
                let fullPath = path.join(modelsDir, file);
                winston.info('Full path: ' + fullPath);
                let model = sequelize.import(fullPath);

                winston.info('Model name: ' + model.name);
                db[model.name] = model;
            });

        winston.info('Invoking associations...');

        // invoke associations on each of the models
        Object.keys(db).forEach(function(modelName) {
            if (db[modelName].options.hasOwnProperty('associate')) {
                db[modelName].options.associate(db);
            }
        });

        winston.info('Assocations invoked. Synchronizing database...');

        // Synchronizing any model changes with database.
        // set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
        //   and force model changes into it, if required;
        // Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
        sequelize
            .sync({
                force: config.forceDbSync,
                logging: config.enableSequelizeLog === 'true' ? winston.verbose : false
            })
            .then(function() {
                winston.info('Database ' + (config.forceDbSync ? '*DROPPED* and ' : '') + 'synchronized');
            }).catch(function(err) {
                winston.error('An error occurred: ', err);
            });

        // assign the sequelize variables to the db object and returning the db.

        db = _.extend({
            sequelize,
            Sequelize
        }, db);

        return db;
    }
}
