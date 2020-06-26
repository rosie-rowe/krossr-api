'use strict';

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');

	// Setting up the users password api
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);
};
