import * as _ from 'lodash';
import { Sequelize } from 'sequelize';
import { EnvironmentConfiguration } from './config';
import * as sequelize from 'sequelize';
import { multiInject, injectable, inject } from 'inversify';
import { ModelSymbols } from '../app/models/ModelSymbols';
import { ModelConfiguration } from '../app/models/ModelConfiguration';
import { LoggerSymbols } from '../app/Logger/LoggerSymbols';
import { KrossrLoggerProvider } from '../app/Logger/KrossrLoggerProvider';
import { KrossrLogger } from '../app/Logger/KrossrLogger';

@injectable()
export class SequelizeConfiguration {
    private logger: KrossrLogger;

    constructor(
        @inject(LoggerSymbols.KrossrLogger) private loggerProvider: KrossrLoggerProvider,
        @inject(EnvironmentConfiguration) private environmentConfiguration: EnvironmentConfiguration,
        @multiInject(ModelSymbols.ModelConfiguration) private modelConfigs: ModelConfiguration<Sequelize>[]
    ) {
        this.logger = this.loggerProvider.getLogger();
    }

    initialize() {
        let db: { sequelize?: sequelize.Sequelize } = {};

        this.logger.info('Initializing Sequelize...');

        let config = this.environmentConfiguration.getConfiguration();

        // create your instance of sequelize
        let database = new Sequelize(config.db.name, config.db.username, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: 'postgres'
        });

        this.modelConfigs.forEach((c) => {
            c.configure(database);
        });

        this.logger.info('Models initialized!');

        // Synchronizing any model changes with database.
        // set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
        //   and force model changes into it, if required;
        // Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
        database
            .sync({
                force: config.forceDbSync,
                logging: config.enableSequelizeLog === 'true' ? this.logger.verbose : false
            })
            .then(() => {
                this.logger.info('Database ' + (config.forceDbSync ? '*DROPPED* and ' : '') + 'synchronized');
            }).catch(err => {
                this.logger.error('An error occurred: ', err);
            });

        // assign the sequelize variables to the db object and returning the db.

        db = _.extend({
            database,
            Sequelize
        }, db);

        return db;
    }
}
