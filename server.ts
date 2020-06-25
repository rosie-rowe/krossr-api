/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

import { WinstonConfiguration } from './config/winston';
import { EnvironmentConfiguration } from './config/config';
import { SequelizeConfiguration } from './config/sequelizeConfig';
let config = EnvironmentConfiguration.getConfiguration();
let winston = WinstonConfiguration.initialize();

winston.info(`Starting ${config.app.title} ...`);

let db = SequelizeConfiguration.initialize();

// // Init the express application
// var app = require('./config/express')(db.sequelize);

// // Bootstrap passport config
// require('./config/passport')();

// // Start the app by listening on <port>
// app.listen(config.port, config.ipaddr);

// // Expose app
// exports = module.exports = app;

// // Logging initialization
// console.log('MEAN.JS application started on port ' + config.port);