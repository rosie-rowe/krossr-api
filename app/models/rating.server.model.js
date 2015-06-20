/*
 * A user rates levels, a level has ratings.
 * Necessary info:
 * Current user's current rating of current level
 * Average of all ratings for given level
 */
 'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rating Schema
 */
var RatingSchema = new Schema({
	_level: {
		type: String,
		ref: 'Level'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	rating: {
		type: Number
	}
});

mongoose.model('Rating', RatingSchema);