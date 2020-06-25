'use strict';

import * as _ from 'lodash';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('./config');
var winston = require('./winston');
var db: any = {};

var rootPath = path.normalize(__dirname + '/..');

config.modelsDir = rootPath + '/app/models';

winston.info('Initializing Sequelize...');

// create your instance of sequelize
var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres'
});

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    // import model files and save model names
    .forEach(function (file) {
        winston.info('Loading model file ' + file);
        var fullPath = path.join(config.modelsDir, file);
        winston.info('Full path: ' + fullPath);
        var model = sequelize.import(fullPath);

        winston.info('Model name: ' + model.name);
        db[model.name] = model;
    });

winston.info('Invoking associations...');

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
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
        force: config.FORCE_DB_SYNC === 'true',
        logging: config.enableSequelizeLog === 'true' ? winston.verbose : false
    })
    .then(function () {
        winston.info('Database ' + (config.FORCE_DB_SYNC === 'true' ? '*DROPPED* and ' : '') + 'synchronized');
    }).catch(function (err) {
        winston.error('An error occurred: ', err);
    });

// assign the sequelize variables to the db object and returning the db. 
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);