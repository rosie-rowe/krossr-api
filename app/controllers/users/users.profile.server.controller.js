'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	passport = require('passport'),
	db = require('../../../config/sequelize'),
	User = db.User;

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user.updateAttributes({
			updated: Date.now(),
			email: req.body.email
		});

		user.save().then(function() {
			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}).catch(function(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};