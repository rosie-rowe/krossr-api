'use strict';

var passport = require('passport'),
	db = require('./sequelize'),
	glob = require('glob'),
	User = db.user,
	path = require('path');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			exclude: ['salt', 'password'],
			where: {
				id: id
			}
		}).then(function(user) {
			done(null, user);
		}).catch(function(err) {
			done(err);
		});
	});

	let strategiesDir = path.resolve(__dirname, '../config/strategies');

	// Initialize strategies
	glob(strategiesDir + '**/*.js', (err, files) => {
		files.forEach(strategy => {
			require(path.resolve(strategy))();
		});
	});
};