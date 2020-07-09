/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

import 'reflect-metadata';
import DIContainer from './di-container';
import { EnvironmentConfiguration } from './config/config';
import { SequelizeConfiguration } from './config/sequelizeConfig';
import { ExpressConfiguration } from './config/expressConfig';
import { PassportConfiguration } from './config/passportConfig';
import { KrossrLoggerProvider } from './app/Logger/KrossrLoggerProvider';
import { LoggerSymbols } from './app/Logger/LoggerSymbols';

let environmentConfiguration = DIContainer.get<EnvironmentConfiguration>(EnvironmentConfiguration);
let config = environmentConfiguration.getConfiguration();

let loggerProvider = DIContainer.get<KrossrLoggerProvider>(LoggerSymbols.KrossrLogger);
loggerProvider.initialize();
let logger = loggerProvider.getLogger();

logger.info(`Starting ${config.app.title} ...`);

let sequelizeConfig = DIContainer.get<SequelizeConfiguration>(SequelizeConfiguration);
let db = sequelizeConfig.initialize();

// Init the express application
let expressConfig = DIContainer.get<ExpressConfiguration>(ExpressConfiguration);
let app = expressConfig.configure(db);

// Bootstrap passport config
let passportConfig = DIContainer.get<PassportConfiguration>(PassportConfiguration);
passportConfig.configure();

// Start the app by listening on <port>
app.listen(config.port, config.ipaddr);

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
