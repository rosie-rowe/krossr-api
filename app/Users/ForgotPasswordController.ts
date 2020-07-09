import * as async from 'async';
import * as crypto from 'crypto';
import { EnvironmentConfiguration } from '../../config/config';
import { User } from '../models/UserModel';
import { ErrorHandler } from '../Error/ErrorHandler';
import { MailerService } from '../Mailer/MailerService';
import { injectable, inject } from 'inversify';
import { IEnvironmentConfiguration } from '../../config/env/IEnvironmentConfiguration';

@injectable()
export class ForgotPasswordController {
    private config: IEnvironmentConfiguration;

    constructor(
        @inject(EnvironmentConfiguration) private environmentConfiguration: EnvironmentConfiguration,
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(MailerService) private mailerService: MailerService
    ) {
        this.config = this.environmentConfiguration.getConfiguration();
    }

    public forgot = (req, res, next) => {
        async.waterfall([
            // Generate random token
            (done) => {
                crypto.randomBytes(20, (err, buffer) => {
                    let token = buffer.toString('hex');
                    done(err, token);
                });
            },
            // Lookup user by username
            (token, done) => {
                // TODO
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
                            return this.errorHandler.sendClientErrorResponse(res, 'Username not found');
                        } else if (user.provider !== 'local') {
                            return this.errorHandler.sendClientErrorResponse(res, `Try ${user.provider} account?`);
                        } else {
                            user.resetPasswordToken = token;

                            let now = new Date();
                            now.setHours(now.getHours() + 1); // add 1 hour
                            user.resetPasswordExpires = now;

                            user.save().then(() => {
                                done(null, token, user);
                            }).catch((err) => {
                                done(err);
                            });
                        }
                    });
                } else {
                    return this.errorHandler.sendClientErrorResponse(res, 'Username required');
                }
            },
            (token, user, done) => {
                res.render('templates/reset-password-email', {
                    name: user.username,
                    appName: this.config.app.title,
                    url: 'http://' + req.headers.host + '/auth/reset/' + token
                }, (err, emailHTML) => {
                    done(err, emailHTML, user);
                });
            },
            // If valid email, send reset email using service
            async (emailHTML, user, done) => {
                let mailOptions = {
                    to: user.email,
                    from: this.config.mailer.from,
                    subject: 'Password Reset',
                    html: emailHTML
                };

                try {
                    await this.mailerService.send(mailOptions);
                    done(null);
                } catch (err) {
                    done(err);
                }
            }
        ], (err) => {
            if (err) { return next(err); }
        });
    }
}
