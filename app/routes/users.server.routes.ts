'use strict';

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
