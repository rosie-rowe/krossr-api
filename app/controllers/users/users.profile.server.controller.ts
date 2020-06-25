'use strict';

import * as _ from 'lodash';
import { ErrorsController } from '../errors.server.controller';

export class UserProfileController {
	private errorHandler: ErrorsController;

	constructor() {
		this.errorHandler = new ErrorsController();
	}

	/**
	 * Update user details
	 */
	update = (req, res) => {
		// Init Variables
		var user = req.user;

		// For security measurement we remove the roles from the req.body object
		delete req.body.roles;

		if (user) {
			// Merge existing user
			user.update({
				updated: Date.now(),
				email: req.body.email
			});

			user.save().then(function () {
				req.login(user, function (err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.jsonp(user);
					}
				});
			}).catch((err) => {
				return res.status(400).send({
					message: this.errorHandler.getErrorMessage(err)
				});
			});
		} else {
			res.status(400).send({
				message: 'User is not signed in'
			});
		}
	}

	/**
	 * Send User
	 */
	me = (req, res) => {
		res.jsonp(req.user || null);
	}
}

let me = new UserProfileController();
exports.update = me.update;
exports.me = me.me;