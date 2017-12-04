'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	db = require('../../config/sequelize'),
	User = db.user,
	Level = db.level,
	winston = require('../../config/winston');

/**
 * Globals
 */
var user, level;

/**
 * Unit tests
 */
describe('Level Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = User.build({
			email: 'test@test.com',
			username: 'username',
			provider: 'local'
		});

		user.salt = user.makeSalt();
		user.hashedPassword = user.encryptPassword('password', user.salt);

		winston.info('Unit test creating a user for Level tests!')

		user.save().then(function() { 
			winston.info('User created! Creating a level...');

			level = Level.build({
				name: 'Level Name',
				user: user,
				size: 25,
				layout: [[true, true, true, true, true],
						 [false, true, true, true, false],
						 [false, true, false, true, false],
						 [false, true, false, true, false],
						 [false, true, false, true, false]]
			});

			done();
		}).catch(function(err) {
			winston.info('User creation failed! Printing error...');
			winston.info(err);
		});;
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			winston.info('Unit test commiting the level to the database!');

			level.save().then(function(l) {
				winston.info('Level created!');

				should.exist(l);
				done();
			}).catch(function(err) {
				winston.info('Level creation failed! Printing error...');
				winston.info(err);
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			level.name = '';

			level.save().then(function(l) {
				winston.info('This message should never print.');	
			}).catch(function(err) {
				done();
			});;
		});
	});

	afterEach(function(done) { 
		Level.destroy({ where: {}});
		User.destroy({ where: {}});

		done();
	});
});