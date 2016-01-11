'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	db = require('../../config/sequelize'),
	User = db.User;

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = User.build({
			email: 'test@test.com',
			username: 'username',
			password: 'passwordhastobelong',
			provider: 'local'
		});
		user2 = User.build({
			email: 'test@test.com',
			username: 'username',
			password: 'passwordhastobelong',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.findAll().then(function(users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save().then(function(u) {
                should.exist(u);
                done();
            });
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save().then(function() {
				winston.info('This message should never display!');
			}).catch(function(err) {
                done();
            });
		});

		it('should be able to show an error when try to save without username', function(done) {
			user.username = '';
			return user.save().then(function() {
                winston.info('This message should never display!');
			}).catch(function(err) {
                done();
            });
		});
	});

	after(function(done) {
        User.destroy({ where: {}});
		done();
	});
});