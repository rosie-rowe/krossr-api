'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
	winston = require('../../config/winston'),
	errorHandler = require('./errors'),
	Level = db.Level,
	Rating = db.Rating,
	Sequelize = require('sequelize');

/**
 * Create a Level
 */
exports.create = function(req, res) {
	req.body.UserId = req.user.id;

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
 * Show the current Level
 */
exports.read = function(req, res) {
	return res.jsonp(req.level);
};

/**
 * Update a Level
 */
exports.update = function(req, res) {
	var level = req.level;

	level.updateAttributes({
		name: req.body.name,
		layout: req.body.layout,
		size: req.body.size,
		timeLimit: req.body.timeLimit
	}).then(function(l) {
		return res.jsonp(l);
	}).catch(function(err) {
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Add or replace a Rating
 */
exports.upsertRating = function(req, res) {
	var level = req.level;
	var user = req.user;
	var rating = Rating.build(req.body);

	rating.UserId = user.id;

	rating.save().then(function() {
		level.addRating(rating).then(function() {
			res.jsonp(level);
		}).catch(function(err) {
			return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
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
 * Level middleware
 */
exports.levelByID = function(req, res, next, id) {

	Level
		.find({ where: {id: id}, include: [db.User]}).then(function(level) {
			if (!level) {
				return next(new Error('Failed to load level ' + id));
			} else {
				req.level = level;
				return next();
			}
		});
};

exports.paginate = function(req, res) {
	var pageNum = req.query.pageNum,
		sizeRestriction = req.query.sizeRestriction,
		searchText = req.query.searchText,
		sortBy = req.query.sortBy || '"createdAt"',
		sortDirection = req.query.sortDirection || 'ASC',
		numPerPage = 9;

	winston.info('Trying to query Levels...');

	Level.findAndCountAll({
		include: [db.Rating],
		where: Sequelize.and(
			sizeRestriction ? ['size = ?', parseInt(sizeRestriction, 10)] : null,
			searchText ? ['name ILIKE ?', '%' + searchText + '%'] : null
			// todo: also search on username
		),
		limit: numPerPage,
		offset: pageNum * numPerPage,
		order: sortBy + ' ' + sortDirection
	}).then(function(levels) {
		return res.jsonp({
			levels: levels.rows,
			count: levels.count,
			numPerPage: numPerPage
		});
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
	if (req.level.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};