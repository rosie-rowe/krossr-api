'use strict';

import { Express } from 'express';

module.exports = function(app: Express) {
	var users = require('../../app/controllers/users');
	var levels = require('../../app/controllers/levels');

	// Levels Routes
	app.route('/levels')
		.post(users.requiresLogin, levels.create);

	app.route('/levels/new')
		.get(levels.newLevel);

	app.route('/levels/:levelId/ratings')
		.post(users.requiresLogin, levels.upsertRating);

	app.route('/levels/:levelId')
		.get(levels.read)
		.put(users.requiresLogin, levels.update)
		.delete(users.requiresLogin, levels.hasAuthorization, levels.delete);

	// Finish by binding the Level middleware
	app.param('levelId', levels.levelByID);
};