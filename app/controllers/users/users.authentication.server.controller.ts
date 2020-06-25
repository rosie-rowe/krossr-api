'use strict';

import * as _ from 'lodash';
/**
 * Module dependencies.
 */
var errorHandler = require('../errors'),
	db = require('../../../config/sequelize'),
	passport = require('passport'),
	User = db.user,
	winston = require('../../../config/winston');

/**
 * Signup
 */
exports.signup = function(req, res) {
	var message = null;

	// Init Variables
	var user = User.build(req.body);

	// Add missing user fields
	user.setPassword(req.body.password);

	winston.info('About to save the user...');

	// Then save the user 
	user.save().then(function() {
		winston.info('Saved the user!');

		user.removeSensitiveInfo();

		req.login(user, function(err) { 
			if (err) {
				res.status(500).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(user);
			}
		});
	}).catch(function(err) {
        return res.status(500).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			user.removeSensitiveInfo();

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.status(200).send();
};