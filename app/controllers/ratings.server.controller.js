'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Rating = mongoose.model('Rating'),
	_ = require('lodash');

/**
 * Add a rating
 */
exports.create = function(req, res) {
	var rating = new Rating(req.body);
	rating.user = req.user;

	rating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rating);
		}
	});
};

/**
 * Update a Rating
 */
exports.update = function(req, res) {
	var rating = req.rating;

	rating = _.extend(rating, req.body);

	rating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rating);
		}
	});
};

/**
 * Rating authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.body.user !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Rating middleware
 */
exports.ratingByID = function(req, res, next, id) {
	Rating
		.findById(id)
		.exec(function(err, rating) {
			if (err) return next(err);
			if (! rating) return next(new Error('Failed to load Rating ' + id));
			req.rating = rating;
			next();
		});
};