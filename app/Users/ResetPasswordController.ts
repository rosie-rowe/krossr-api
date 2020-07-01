import * as async from 'async';
import { ErrorHandler } from '../Error/ErrorHandler';
import { EnvironmentConfiguration } from '../../config/config';
import { User } from '../models/UserModel';
import { Op } from 'sequelize';

let nodemailerReset = require('nodemailer'); // TODO

export class ResetPasswordController {
    constructor(
        private errorHandler: ErrorHandler
    ) {
    }

    /**
     * Reset password GET from email token
     */
    public validateResetToken = (req, res) => {
        User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    [Op.gt]: new Date()
                }
            }
        }).then((user) => {
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
        // Init Variables
        let passwordDetails = req.body;

        async.waterfall([
            (done) => {
                User.findOne({
                    where: {
                        resetPasswordToken: req.params.token,
                        resetPasswordExpires: {
                            [Op.gt]: new Date()
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

                            user.save().then(() => {
                                req.login(user, (err) => {
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
            (user, done) => {
                res.render('templates/reset-password-confirm-email', {
                    name: user.username,
                    appName: config.app.title
                }, (err, emailHTML) => {
                    done(err, emailHTML, user);
                });
            },
            // If valid email, send reset email using service
            (emailHTML, user, done) => {
                let smtpTransport = nodemailerReset.createTransport(config.mailer.options);
                let mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Your password has been changed',
                    html: emailHTML
                };

                smtpTransport.sendMail(mailOptions, (err) => {
                    done(err, 'done');
                });
            }
        ], (err) => {
            if (err) { return next(err); }
        });
    }
}
