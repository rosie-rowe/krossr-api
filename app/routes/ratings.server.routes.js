'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var levels = require('../../app/controllers/levels');
	var ratings = require('../../app/controllers/ratings')

	// Levels Routes
	app.route('/ratings/:levelId')
		.post(users.requiresLogin, ratings.create);

	app.route('/ratings/:levelId')
		.get(ratings.read);

	app.route('/ratings/:ratingId')
		.put(users.requiresLogin, ratings.hasAuthorization, ratings.update)

	// Finish by binding the Rating middleware
	app.param('ratingId', ratings.ratingByID);
	app.param('levelId', ratings.ratingsByLevelIDForYou);
};