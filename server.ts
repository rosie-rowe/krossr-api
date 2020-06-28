/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

import { WinstonConfiguration } from './config/winston';
import { EnvironmentConfiguration } from './config/config';
import { SequelizeConfiguration } from './config/sequelizeConfig';
import { ExpressConfiguration } from './config/expressConfig';
import { PassportConfiguration } from './config/passportConfig';
let config = EnvironmentConfiguration.getConfiguration();
let winston = WinstonConfiguration.initialize();

winston.info(`Starting ${config.app.title} ...`);

let db = SequelizeConfiguration.initialize();

// Init the express application
let app = ExpressConfiguration.configure(db);

// Bootstrap passport config
PassportConfiguration.configure(db);

// Start the app by listening on <port>
app.listen(config.port, config.ipaddr);

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
