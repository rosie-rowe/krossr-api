import * as async from 'async';
import { IKrossrDatabase } from '../Database/IKrossrDatabase';
import { EnvironmentConfiguration } from '../../config/config';

// TODO use types/import
let nodemailerForgot = require('nodemailer');
let cryptoForgot = require('crypto');

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
            (done) => {
                cryptoForgot.randomBytes(20, (err, buffer) => {
                    let token = buffer.toString('hex');
                    done(err, token);
                });
            },
            // Lookup user by username
            (token, done) => {
                if (req.body.username) {
                    User.findOne({
                        attributes: {
                            exclude: ['salt, password']
                        },
                        where: {
                            username: req.body.username
                        }
                    }).then((user) => {
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

                            user.save().then(() => {
                                done(null, token, user);
                            }).catch((err) => {
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
            (token, user, done) => {
                // TODO
                res.render('templates/reset-password-email', {
                    name: user.username,
                    appName: config.app.title,
                    url: 'http://' + req.headers.host + '/auth/reset/' + token
                }, (err, emailHTML) => {
                    done(err, emailHTML, user);
                });
            },
            // If valid email, send reset email using service
            (emailHTML, user, done) => {
                let smtpTransport = nodemailerForgot.createTransport(config.mailer.options);
                let mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Password Reset',
                    html: emailHTML
                };
                smtpTransport.sendMail(mailOptions, (err) => {
                    if (!err) {
                        res.send({
                            message: 'Email sent!'
                        });
                    }

                    done(err);
                });
            }
        ], (err) => {
            if (err) { return next(err); }
        });
    }
}
