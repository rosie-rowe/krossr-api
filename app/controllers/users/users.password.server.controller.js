'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    db = require('../../../config/sequelize'),
    passport = require('passport'),
    User = db.user,
    config = require('../../../config/config'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto');

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function(req, res, next) {
    async.waterfall([
        // Generate random token
        function(done) {
            crypto.randomBytes(20, function(err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Lookup user by username
        function(token, done) {
            if (req.body.username) {
                User.find({
                    attributes: {
                        exclude: ['salt, password']
                    },
                    where: {
                        username: req.body.username
                    }
                }).then(function(user) {
                    if (!user) {
                        return res.status(400).send({
                            message: 'Username not found'
                        });
                    } else if (user.provider !== 'local') {
                        return res.status(400).send({
                            message: 'Try ' + user.provider + ' account?'
                        });
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save().then(function() {
                            done(null, token, user);
                        }).catch(function(err) {
                            done(err);
                        });
                    }
                });
            } else {
                return res.status(400).send({
                    message: 'Username required'
                });
            }
        },
        function(token, user, done) {
            res.render('templates/reset-password-email', {
                name: user.username,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/auth/reset/' + token
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function(emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                if (!err) {
                    res.send({
                        message: 'An email has been sent to ' + user.email + ' with further instructions.'
                    });
                }

                done(err);
            });
        }
    ], function(err) {
        if (err) return next(err);
    });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
    User.find({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }
    }).then(function(user) {
        if (!user) {
            return res.redirect('/#!/password/reset/invalid');
        }

        res.redirect('/#!/password/reset/' + req.params.token);
    }).catch(function(err) {
        res.status(500).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * Reset password POST from email token
 */
exports.reset = function(req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([

        function(done) {
            User.find({
                where: {
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {
                        $gt: Date.now()
                    }
                }
            }).then(function(user) {
                if (!user) {
                    return res.status(400).send({
                        message: 'Password reset token is invalid or has expired.'
                    });
                } else {
                    if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                        user.password = passwordDetails.newPassword;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save().then(function() {
                            req.login(user, function(err) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    // Return authenticated user 
                                    res.jsonp(user);

                                    done(err, user);
                                }
                            });
                        }).catch(function(err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        });
                    } else {
                        return res.status(400).send({
                            message: 'Passwords do not match'
                        });
                    }
                }
            });
        },
        function(user, done) {
            res.render('templates/reset-password-confirm-email', {
                name: user.username,
                appName: config.app.title
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function(emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Your password has been changed',
                html: emailHTML
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
    });
};

/**
 * Change Password
 */
exports.changePassword = function(req, res) {
    // Init Variables
    var passwordDetails = req.body;

    if (req.user) {
        if (passwordDetails.newPassword) {
            User.find({
                where: {
                    id: req.user.id
                }
            }).then(function(user) {
                if (!user) {
                    res.status(400).send({
                        message: 'User is not found'
                    });
                } else {
                    if (user.authenticate(passwordDetails.currentPassword)) {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.hashedPassword = user.encryptPassword(passwordDetails.newPassword, user.salt);

                            user.save().then(function() {
                                req.login(user, function(err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.send({
                                            message: 'Password changed successfully'
                                        });
                                    }
                                });
                            }).catch(function(err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            });
                        } else {
                            res.status(400).send({
                                message: 'Passwords do not match'
                            });
                        }
                    } else {
                        res.status(400).send({
                            message: 'Current password is incorrect'
                        });
                    }
                }
            }).catch(function(err) {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            });
        } else {
            res.status(400).send({
                message: 'Please provide a new password'
            });
        }
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};