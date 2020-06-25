'use strict';
/**
 * Module dependencies.
 */

//jshint unused:false
var init = require('./config/init')(),
	config = require('./config/config'),
    winston = require('./config/winston');

winston.info('Starting '+config.app.name+'...');
winston.info('Config loaded: '+config.NODE_ENV);
winston.debug('Accepted Config:',config);

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

var db = require('./config/sequelize');

// Init the express application
var app = require('./config/express')(db.sequelize);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port, config.ipaddr);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);