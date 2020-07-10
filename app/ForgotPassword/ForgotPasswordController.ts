import * as crypto from 'crypto';
import { EnvironmentConfiguration } from '../../config/config';
import { User } from '../models/UserModel';
import { ErrorHandler } from '../Error/ErrorHandler';
import { MailerService } from '../Mailer/MailerService';
import { injectable, inject } from 'inversify';
import { IEnvironmentConfiguration } from '../../config/env/IEnvironmentConfiguration';
import { ForgotPasswordRequest } from './ForgotPasswordRequest';
import { Response } from 'express';

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

    public forgot = async (req: ForgotPasswordRequest, res, next) => {
        if (!req.body.username) {
            return this.errorHandler.sendClientErrorResponse(res, 'Username required');
        }

        try {
            let token = await this.generateRandomToken();
            let user = await this.getUser(req.body.username);

            if (!user) {
                return this.errorHandler.sendClientErrorResponse(res, 'Username not found');
            }

            this.updateUser(user, token);

            let emailHTML = await this.renderEmail(res, req, user, token);

            await this.sendEmail(emailHTML, user);

            res.send();
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    private generateRandomToken() {
        return new Promise<string>((resolve, reject) => {
            crypto.randomBytes(20, (err, buffer) => {
                if (err) {
                    reject(err);
                }

                resolve(buffer.toString('hex'));
            });
        });
    }

    private getExpirationDateTime() {
        let now = new Date();
        now.setHours(now.getHours() + 1); // add 1 hour

        return now;
    }

    private async getUser(username: string) {
        if (username) {
            return await User.findOne({
                attributes: {
                    exclude: ['salt, password']
                },
                where: {
                    username
                }
            });
        }
    }

    private async updateUser(user: User, token: string) {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = this.getExpirationDateTime();

        await user.save();
    }

    private async renderEmail(res: Response, req: ForgotPasswordRequest, user: User, token: string) {
        return new Promise<string>((resolve, reject) => {
            res.render('templates/reset-password-email', {
                name: user.username,
                appName: this.config.app.title,
                url: 'http://' + req.headers.host + '/auth/reset/' + token
            }, (err, emailHTML) => {
                if (err) {
                    reject(err);
                }

                resolve(emailHTML);
            });
        });
    }

    private async sendEmail(emailHTML: string, user: User) {
        let mailOptions = {
            to: user.email,
            from: this.config.mailer.from,
            subject: 'Password Reset',
            html: emailHTML
        };

        await this.mailerService.send(mailOptions);
    }
}
