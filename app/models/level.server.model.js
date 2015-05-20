'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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
		type: Number
	}
});

mongoose.model('Level', LevelSchema);