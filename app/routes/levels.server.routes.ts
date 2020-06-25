'use strict';

import { Express } from 'express';

module.exports = function(app: Express) {
	var users = require('../../app/controllers/users');
	var levels = require('../../app/controllers/levels');

	app.route('/levels/:levelId')
		.put(users.requiresLogin, levels.update)
		.delete(users.requiresLogin, levels.hasAuthorization, levels.delete);
};