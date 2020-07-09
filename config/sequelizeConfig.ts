'use strict';

import * as _ from 'lodash';
import { WinstonConfiguration } from './winston';
import { Sequelize } from 'sequelize';
import { EnvironmentConfiguration } from './config';
import * as sequelize from 'sequelize';
import { multiInject, injectable } from 'inversify';
import { ModelSymbols } from '../app/models/ModelSymbols';
import { ModelConfiguration } from '../app/models/ModelConfiguration';

let config = EnvironmentConfiguration.getConfiguration();
let winston = WinstonConfiguration.initialize();

@injectable()
export class SequelizeConfiguration {
    constructor(
        @multiInject(ModelSymbols.ModelConfiguration) private modelConfigs: ModelConfiguration<Sequelize>[]
    ) {
    }

    initialize() {
        let db: { sequelize?: sequelize.Sequelize } = {};

        winston.info('Initializing Sequelize...');

        // create your instance of sequelize
        let sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: 'postgres'
        });

        this.modelConfigs.forEach((c) => {
            c.configure(sequelize);
        });

        winston.info('Models initialized!');

        // Synchronizing any model changes with database.
        // set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
        //   and force model changes into it, if required;
        // Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
        sequelize
            .sync({
                force: config.forceDbSync,
                logging: config.enableSequelizeLog === 'true' ? winston.verbose : false
            })
            .then(() => {
                winston.info('Database ' + (config.forceDbSync ? '*DROPPED* and ' : '') + 'synchronized');
            }).catch(err => {
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
