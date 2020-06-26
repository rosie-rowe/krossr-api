import * as async from 'async';
import { IKrossrDatabase } from '../Database/IKrossrDatabase';
import { EnvironmentConfiguration } from '../../config/config';

// TODO use types/import
var nodemailerForgot = require('nodemailer');
var cryptoForgot = require('crypto');

export class ForgotPasswordController {
    constructor(
        private db: IKrossrDatabase
    ) {
    }

    // TODO set up mailgun or something and make sure this still works
    public forgot = (req, res, next) => {


        let config = EnvironmentConfiguration.getConfiguration();
        let User = this.db.user;

        async.waterfall([
            // Generate random token
            function(done) {
                cryptoForgot.randomBytes(20, function(err, buffer) {
                    var token = buffer.toString('hex');
                    done(err, token);
                });
            },
            // Lookup user by username
            function(token, done) {
                if (req.body.username) {
                    User.findOne({
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
                // TODO
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
                var smtpTransport = nodemailerForgot.createTransport(config.mailer.options);
                var mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Password Reset',
                    html: emailHTML
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    if (!err) {
                        res.send({
                            message: 'Email sent!'
                        });
                    }
    
                    done(err);
                });
            }
        ], function(err) {
            if (err) return next(err);
        });
    }
}