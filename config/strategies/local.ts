'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	db = require('../sequelize'),
	User = db.user;

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({ 
				where: {
					username
				}
			}).then(user => {
				if (!user) return done(null, false);
				if (!user.authenticate(password)) return done(null, false);

				return done(null, user);
			}).catch(err => {
				if (err) return done(err);
			});
		}
	));
};