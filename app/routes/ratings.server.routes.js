'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var levels = require('../../app/controllers/levels');
	var ratings = require('../../app/controllers/ratings')

	// Levels Routes
	app.route('/ratings')
		.post(users.requiresLogin, ratings.create);

	app.route('/ratings/:ratingId')
		.put(users.requiresLogin, ratings.hasAuthorization, ratings.update)

	// app.route('/levels/:levelId')
	// 	.get(levels.read)
	// 	.put(users.requiresLogin, levels.hasAuthorization, levels.update)
	// 	.delete(users.requiresLogin, levels.hasAuthorization, levels.delete);

	// Finish by binding the Rating middleware
	app.param('ratingId', ratings.ratingByID);
};