import { ErrorHandler } from '../Error/ErrorHandler';
import { EnvironmentConfiguration } from '../../config/config';
import { User } from '../models/UserModel';
import { Op } from 'sequelize';
import { UserViewModelMapper } from '../Users/UserViewModelMapper';
import { MailerService } from '../Mailer/MailerService';
import { ResetPasswordValidationResponse } from './ResetPasswordValidationResponse';
import { IEnvironmentConfiguration } from '../../config/env/IEnvironmentConfiguration';
import { injectable, inject } from 'inversify';
import { ResetPasswordRequest } from './ResetPasswordRequest';
import { PasswordService } from '../Password/PasswordService';
import { Response } from 'express';

@injectable()
export class ResetPasswordController {
    private config: IEnvironmentConfiguration;

    constructor(
        @inject(EnvironmentConfiguration) private environmentConfiguration: EnvironmentConfiguration,
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(MailerService) private mailerService: MailerService,
        @inject(PasswordService) private passwordService: PasswordService,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
        this.config = this.environmentConfiguration.getConfiguration();
    }

    /**
     * Reset password GET from email token
     */
    public validateResetToken = async (req: ResetPasswordRequest, res: ResetPasswordValidationResponse) => {
        try {
            let user = await this.getUserByToken(req.params.token);

            return res.send({ valid: !!user });
        } catch (err) {
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    public reset = async (req: ResetPasswordRequest, res: Response) => {
        try {
            let user = await this.getUserByToken(req.params.token);

            if (!user) {
                return this.errorHandler.sendClientErrorResponse(res, 'Password reset token is invalid or has expired');
            }

            await this.resetPassword(req, res, user);

            let emailTemplate = await this.renderEmailTemplate(res, user);

            await this.sendEmail(user.email, emailTemplate);
        } catch (err) {
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
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

    private async resetPassword(req: ResetPasswordRequest, res: Response, user: User) {
        let passwordDetails = req.body;

        if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
            return this.errorHandler.sendClientErrorResponse(res, 'Password do not match');
        }

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        this.passwordService.setPassword(user, passwordDetails.newPassword);

        await user.save();

        req.login(user, (err) => {
            if (err) {
                throw err;
            } else {
                // Return authenticated user
                let result = this.userMapper.toViewModel(user);
                res.jsonp(result);
            }
        });
    }

    private async renderEmailTemplate(res: Response, user: User) {
        return new Promise<string>((resolve, reject) => {
            res.render('templates/reset-password-confirm-email', {
                name: user.username,
                appName: this.config.app.title
            }, (err, emailHTML) => {
                if (err) {
                    reject(err);
                }

                resolve(emailHTML);
            });
        });
    }

    private async sendEmail(to: string, emailHTML: string) {
        let mailOptions = {
            to,
            from: this.config.mailer.from,
            subject: 'Your password has been changed',
            html: emailHTML
        };

        await this.mailerService.send(mailOptions);
    }
}
