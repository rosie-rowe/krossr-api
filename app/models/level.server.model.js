'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var timeLimitValidator = function(value) {
	return /^\d+$/.test(value);
};

/**
 * Level Schema
 */
var LevelSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Level name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	layout: {
		type: Array
	},
	size: {
		type: Number
	},
	timeLimit: {
		type: Number,
		validate: [timeLimitValidator, 'Time limit must be an integer'],
		required: 'Please provide time limit'
	},
	ratings: [{
		type: Schema.ObjectId,
		ref: 'Rating'
	}]
});

mongoose.model('Level', LevelSchema);