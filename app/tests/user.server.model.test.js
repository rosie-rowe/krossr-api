// 'use strict';

// /**
//  * Module dependencies.
//  */
// var should = require('should'),
// 	db = require('../../config/sequelize'),
// 	User = db.User;

// /**
//  * Globals
//  */
// var user, user2;

// /**
//  * Unit tests
//  */
// describe('User Model Unit Tests:', function() {
// 	before(function(done) {
// 		user = User.build({
// 			email: 'test@test.com',
// 			username: 'username',
// 			password: 'passwordhastobelong',
// 			provider: 'local'
// 		});
// 		user2 = User.build({
// 			email: 'test@test.com',
// 			username: 'username',
// 			password: 'passwordhastobelong',
// 			provider: 'local'
// 		});

// 		done();
// 	});

// 	describe('Method Save', function() {
// 		it('should begin with no users', function(done) {
// 			User.find({}, function(err, users) {
// 				users.should.have.length(0);
// 				done();
// 			});
// 		});

// 		it('should be able to save without problems', function(done) {
// 			User.create(user).then(done);
// 		});

// 		it('should fail to save an existing user again', function(done) {
// 			user.save();
// 			return user2.save().then(function(u) {
// 				should.not.exist(u);
// 				done();
// 			});
// 		});

// 		it('should be able to show an error when try to save without username', function(done) {
// 			user.username = '';
// 			return user.save().then(function(u) {
// 				should.not.exist(u);
// 				done();
// 			});
// 		});
// 	});

// 	after(function(done) {
// 		//User.remove().exec();
// 		done();
// 	});
// });