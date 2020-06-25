'use strict';

import { LocalPassportStrategy } from "./strategies/local";

var passport = require('passport');

export class PassportConfiguration {
	static configure(db) {
		let User = db.user;

		// Serialize sessions
		passport.serializeUser(function (user, done) {
			done(null, user.id);
		});

		// Deserialize sessions
		passport.deserializeUser(function (id, done) {
			User.findOne({
				exclude: ['salt', 'password'],
				where: {
					id: id
				}
			}).then(function (user) {
				done(null, user);
			}).catch(function (err) {
				done(err);
			});
		});

		LocalPassportStrategy.use(db);
	}
}
