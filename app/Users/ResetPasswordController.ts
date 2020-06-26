import * as async from 'async';
import { IKrossrDatabase } from "../Database/IKrossrDatabase";
import { ErrorHandler } from "../Error/errors.server.controller";
import { EnvironmentConfiguration } from '../../config/config';

var nodemailerReset = require('nodemailer'); // TODO

export class ResetPasswordController {
    constructor(
        private db: IKrossrDatabase,
        private errorHandler: ErrorHandler
    ) {
    }

    /**
     * Reset password GET from email token
     */
    public validateResetToken = (req, res) => {
        let User = this.db.user;

        User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }
        }).then(function (user) {
            // todo these redirects suck
            if (!user) {
                return res.redirect('/password/reset/invalid');
            }

            res.redirect('/password/reset/' + req.params.token);
        }).catch((err) => {
            res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }

    // TODO refactor
    public reset = (req, res, next) => {
        let config = EnvironmentConfiguration.getConfiguration();
        let User = this.db.user;
        // Init Variables
        var passwordDetails = req.body;

        async.waterfall([
            function (done) {
                User.findOne({
                    where: {
                        resetPasswordToken: req.params.token,
                        resetPasswordExpires: {
                            $gt: Date.now()
                        }
                    }
                }).then(function (user) {
                    if (!user) {
                        return res.status(400).send({
                            message: 'Password reset token is invalid or has expired.'
                        });
                    } else {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.setPassword(passwordDetails.newPassword);

                            user.save().then(function () {
                                req.login(user, function (err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        // Return authenticated user 
                                        res.jsonp(user);

                                        done(err, user);
                                    }
                                });
                            }).catch((err) => {
                                return res.status(400).send({
                                    message: this.errorHandler.getErrorMessage(err)
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
            function (user, done) {
                res.render('templates/reset-password-confirm-email', {
                    name: user.username,
                    appName: config.app.title
                }, function (err, emailHTML) {
                    done(err, emailHTML, user);
                });
            },
            // If valid email, send reset email using service
            function (emailHTML, user, done) {
                var smtpTransport = nodemailerReset.createTransport(config.mailer.options);
                var mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Your password has been changed',
                    html: emailHTML
                };

                smtpTransport.sendMail(mailOptions, function (err) {
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
        });
    }
}