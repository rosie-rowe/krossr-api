import * as async from 'async';
import { ErrorHandler } from '../Error/ErrorHandler';
import { EnvironmentConfiguration } from '../../config/config';
import { User } from '../models/UserModel';
import { Op } from 'sequelize';
import { UserViewModelMapper } from './UserViewModelMapper';
import { MailerService } from '../Mailer/MailerService';
import { ResetPasswordValidationResponse } from './ResetPasswordValidationResponse';
import { IEnvironmentConfiguration } from '../../config/env/IEnvironmentConfiguration';

export class ResetPasswordController {
    constructor(
        private errorHandler: ErrorHandler,
        private mailerService: MailerService,
        private userMapper: UserViewModelMapper
    ) {
    }

    /**
     * Reset password GET from email token
     */
    public validateResetToken = async (req, res: ResetPasswordValidationResponse) => {
        try {
            let user = await this.getUserByToken(req.params.token);

            return res.send({ valid: !!user });
        } catch (err) {
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    public reset = (req, res, next) => {
        let config = EnvironmentConfiguration.getConfiguration();

        async.waterfall([
            async (done) => {
                let user = await this.getUserByToken(req.params.token);

                done(null, user);
            },
            (user: User, done) => this.resetPassword(req, res, user, done),
            async (user: User, done) => this.renderEmailTemplate(res, config, user, done),
            async (emailHTML: string, user: User, done) => this.sendEmail(config, user.email, emailHTML, done)
        ], (err) => {
            if (err) { return next(err); }
        });
    }

    private async getUserByToken(token: string) {
        return await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [Op.gt]: new Date()
                }
            }
        });
    }

    private resetPassword(req, res, user: User, done) {
        let passwordDetails = req.body;

        if (!user) {
            return this.errorHandler.sendClientErrorResponse(res, 'Password reset token is invalid or has expired');
        } else {
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;

                user.setPassword(passwordDetails.newPassword);

                user.save().then(() => {
                    req.login(user, (err) => {
                        if (err) {
                            this.errorHandler.sendUnknownClientErrorResponse(res, err);
                        } else {
                            // Return authenticated user
                            let result = this.userMapper.toViewModel(user);
                            res.jsonp(result);

                            done(err, user);
                        }
                    });
                }).catch((err) => {
                    this.errorHandler.sendUnknownClientErrorResponse(res, err);
                });
            } else {
                return this.errorHandler.sendClientErrorResponse(res, 'Password do not match');
            }
        }
    }

    private async renderEmailTemplate(res, config: IEnvironmentConfiguration, user: User, done) {
        res.render('templates/reset-password-confirm-email', {
            name: user.username,
            appName: config.app.title
        }, (err, emailHTML) => {
            done(err, emailHTML, user);
        });
    }

    // If valid email, send reset email using service
    private async sendEmail(config: IEnvironmentConfiguration, to: string, emailHTML: string, done) {
        let mailOptions = {
            to,
            from: config.mailer.from,
            subject: 'Your password has been changed',
            html: emailHTML
        };

        try {
            await this.mailerService.send(mailOptions);
            done(null);
        } catch (err) {
            done(err);
        }
    }
}
