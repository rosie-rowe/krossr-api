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