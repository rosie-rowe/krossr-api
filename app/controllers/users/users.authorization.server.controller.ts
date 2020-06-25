'use strict';

import * as _ from 'lodash';

/**
 * Module dependencies.
 */
var db = require('../../../config/sequelize'),
	User = db.user;

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({ where: { id: id }}).then(function(user) {
		if (!user) {
			return next(new Error('Failed to load User ' + id));
		}
		req.profile = user;
		next();
	}).catch(function(err) {
		next(err);
	});
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};