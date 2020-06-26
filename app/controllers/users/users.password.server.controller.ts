'use strict';

import * as _ from 'lodash';

/**
 * Module dependencies.
 */
var errorHandler = require('../errors'),
    db = require('../../../config/sequelize'),
    User = db.user,
    config = require('../../../config/config'),
    nodemailerUser = require('nodemailer'), // TODO
    async = require('async');

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
    User.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }
    }).then(function(user) {
        // todo these redirects suck
        if (!user) {
            return res.redirect('/password/reset/invalid');
        }

        res.redirect('/password/reset/' + req.params.token);
    }).catch(function(err) {
        res.status(500).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * Reset password POST from email token
 * TODO re-evalulate
 */
exports.reset = function(req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([

        function(done) {
            User.findOne({
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
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.setPassword(passwordDetails.newPassword);

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
            var smtpTransport = nodemailerUser.createTransport(config.mailer.options);
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
