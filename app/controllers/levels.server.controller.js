'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
	winston = require('../../config/winston'),
	errorHandler = require('./errors'),
	Level = db.level,
	Rating = db.rating,
	Sequelize = require('sequelize');

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
			Rating.update({
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
 * Level middleware
 */
exports.levelByID = function(req, res, next, id) {
	let user = req.user;

	Level
		.findOne({
			include: [
				{
					attributes: ['rating'],
					model: db.rating,
					where: {
						userId: user.id
					}
				}
			],
            where: {
                id: id
            }
        }).then(function(level) {
			if (!level) {
				return next(new Error('Failed to load level ' + id));
			} else {
				if (level.ratings.length) {
					level.yourRating = level.ratings[0].rating;
				}
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

	var whereBuilder = {};

    /* This may be able to be done better, but hey. Include the average rating of a level with the levels query,
     * rather than every ratings object for that level. Also, exclude levels without average ratings if ratings are being filtered upon */
    var baseRatingQuery = '(SELECT AVG("ratings"."rating") FROM "ratings" WHERE "ratings"."levelId" = "level"."id")';
    var ratingQuery = Sequelize.literal(baseRatingQuery);
    var ratingTest = Sequelize.literal(baseRatingQuery + ' IS NOT NULL');

    var isRating = (sortBy === '"avgRating"');

	if (sizeRestriction) {
		whereBuilder.size = {
			$eq: parseInt(sizeRestriction, 10)
		};
	}

	if (searchText) {
		searchText = '%' + searchText + '%';

		whereBuilder.$or = [
			{
				name: {
					$iLike: searchText
				}
			},
			Sequelize.where(Sequelize.col('user.username'), 'ILIKE', searchText)
		];
	}

	Level.findAndCountAll({
        attributes: {
            include: [[ratingQuery, 'avgRating']]
        },
		include: [
            {
                model: db.rating,
                attributes: []
            },
            {
                model: db.user,
                attributes: ['username'],
                required: true,
                where: {}
            }
        ],
		where: {
			$and: isRating ? [whereBuilder, ratingTest] : whereBuilder
		},
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
        winston.info(err);

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