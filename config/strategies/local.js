'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	db = require('../sequelize'),
	User = db.User;

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.find({
				where: {
					username: username
				}
			}).then(function(user) {
				if (!user) {
					return done(null, false, {
						message: 'Unknown user'
					});
				}

				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}


				return done(null, user);
			}).catch(function(err) {
				return done(err);
			});
		}
	));
};