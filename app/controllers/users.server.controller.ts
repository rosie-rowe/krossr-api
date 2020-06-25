'use strict';

/**
 * Module dependencies.
 */
var _: _.LoDashStatic = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication'),
	require('./users/users.authorization'),
	require('./users/users.password')
);