'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
	winston = require('../../config/winston'),
	errorHandler = require('./errors'),
	Level = db.level,
	Rating = db.rating,
	User = db.user,
	Sequelize = require('sequelize'),
	Op = Sequelize.Op;

/**
 * Create a Level
 */
exports.create = function(req, res) {
	req.body.userId = req.user.id;

	Level.create(req.body).then(function(level) {
		if (!level) {
			return res.status(500).send({
				message: 'There was a problem creating the level'
			});
		} else {
			return res.jsonp(level);
		}
	}).catch(function(err) {
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Load the template to create a new level
 */
exports.newLevel = function(req, res) {
	return res.jsonp();
};

/**
 * Update a Level
 */
exports.update = function(req, res) {
	var level = req.level;

	return level.update({
		name: req.body.name,
		layout: req.body.layout,
		size: req.body.size
	}).then(function(l) {
		return res.jsonp(l);
	}).catch(function(err) {
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Add or replace a Rating. Each user should only be able to have one rating for each level.
 */
exports.upsertRating = function(req, res) {
	var level = req.level;
	var user = req.user;
	var rating = Rating.build(req.body);

	/* Simulated composite primary key since Sequelize doesn't support them yet */
	Rating.findOrCreate({
		where: {
			userId: user.id,
			levelId: level.id
		},
		defaults: {
			rating: rating.rating
		}
	}).spread(function(result, created) {
		if (!created) {
			return Rating.update({
				rating: rating.rating
			}, {
				where: {
					userId: user.id,
					levelId: level.id
				}
			}).then(function() {
				res.jsonp(level);
			}).catch(function(err) {
				return res.status(500).send({
					message: errorHandler.getErrorMessage(err)
				});
			});
		} else {
			res.jsonp(level);
		}
	}).catch(function(err) {
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Delete a Level
 */
exports.delete = function(req, res) {
	var level = req.level;

	level.destroy().then(function() {
		return res.jsonp(level);
	}).catch(function(err) {
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Level authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.level.userId !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};