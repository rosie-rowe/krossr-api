'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Level = mongoose.model('Level'),
	Rating = mongoose.model('Rating'),
	_ = require('lodash');

/**
 * Create a Level
 */
exports.create = function(req, res) {
	var level = new Level(req.body);
	level.user = req.user;

	level.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(level);
		}
	});
};

/**
 * Show the current Level
 */
exports.read = function(req, res) {
	res.jsonp(req.level);
};

/**
 * Update a Level
 */
exports.update = function(req, res) {
	var level = req.level ;

	level = _.extend(level , req.body);

	level.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(level);
		}
	});
};

/**
 * Delete an Level
 */
exports.delete = function(req, res) {
	var level = req.level ;

	level.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(level);
		}
	});
};

/**
 * List of Levels
 */
exports.list = function(req, res) { Level.find().sort('-created').populate('user', 'username').exec(function(err, levels) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(levels);
		}
	});
};

/**
 * Level middleware
 */
exports.levelByID = function(req, res, next, id) {
	Level
		.findById(id)
		.populate('user', 'username')
		.exec(function(err, level) {
			if (err) return next(err);
			if (! level) return next(new Error('Failed to load Level ' + id));
			req.level = level ;
			next();
		});
};

exports.paginate = function(req, res) {
	var pageNum = req.query['pageNum'],
		sizeRestriction = req.query['sizeRestriction'],
		searchText = req.query['searchText'],
		sortBy = req.query['sortBy'],
		sortDirection = req.query['sortDirection'],
		numPerPage = 9,
		totalCount,
		query,
		searchRegex = new RegExp(searchText, 'i');

	 query = Level
				.find()
				.populate('user', 'username')
				.limit(numPerPage)
				.skip(pageNum * numPerPage);

	if (sortBy) {
		query.sort(sortDirection + sortBy);
	}

	if (sizeRestriction) {
		sizeRestriction = parseInt(sizeRestriction, 10);
		query.where('size').equals(sizeRestriction);
	}

	query.exec(function(err, levels) {
		// As far as I can tell from googling, this is a limitation of mongo
		// in that you can't .where on a populated field, so it has to be done after the initial fetch..
		// will probably get slow with more levels,  but it'll work until I can switch the db.
		if (searchText) {
			levels = levels.filter(function(level) {
				return searchRegex.test(level.user.username) || searchRegex.test(level.name);
			});
		}

		if (err) {
			return res.status(400).send({
				message: sizeRestriction
			});
		} else {
			Level.find().count({}, function(err, totalCount) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp({
						levels: levels,
						count: totalCount,
						numPerPage: numPerPage
					});
				}
			});
		}
	});
};

/**
 * Level authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.level.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};