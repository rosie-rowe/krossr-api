import { ErrorHandler } from '../Error/ErrorHandler';
import { User } from '../models/UserModel';
import { KrossrErrorResponse } from '../KrossrResponse/KrossrErrorResponse';
import { inject, injectable } from 'inversify';
import { ChangePasswordRequest } from './ChangePasswordRequest';
import { PasswordService } from '../Password/PasswordService';
import { Response } from 'express';

@injectable()
export class ChangePasswordController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(PasswordService) private passwordService: PasswordService
    ) {
    }

    public changePassword = async (req: ChangePasswordRequest, res: Response) => {
        let passwordDetails = req.body;

        if (!passwordDetails.newPassword) {
            return this.newPasswordMissing(res);
        }

        if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
            return this.passwordsDoNotMatch(res);
        }

        if (!req.user) {
            return this.userIsNotSignedIn(res);
        }

        try {
            let user = await User.findOne({
                where: {
                    id: req.user.id
                }
            });

            if (!user) {
                return this.userIsNotFound(res);
            }

            if (!this.passwordService.authenticate(user, passwordDetails.currentPassword)) {
                return this.currentPasswordIsIncorrect(res);
            }

            this.passwordService.setPassword(user, passwordDetails.newPassword);

            try {
                await user.save();

                req.login(user, (err) => {
                    if (err) {
                        this.unknownError(res, err);
                    } else {
                        res.send();
                    }
                });
            } catch (err) {
                this.unknownError(res, err);
            }
        } catch (err) {
            this.unknownError(res, err);
        }
    }

    private newPasswordMissing(res: KrossrErrorResponse) {
        this.errorHandler.sendClientErrorResponse(res, 'Please provide a new password');
    }

    private passwordsDoNotMatch(res: KrossrErrorResponse) {
        this.errorHandler.sendClientErrorResponse(res, 'Passwords do not match');
    }

    private userIsNotSignedIn(res: KrossrErrorResponse) {
        this.errorHandler.sendClientErrorResponse(res, 'User is not signed in');
    }

    private userIsNotFound(res: KrossrErrorResponse) {
        this.errorHandler.sendClientErrorResponse(res, 'User is not found');
    }

    private currentPasswordIsIncorrect(res: KrossrErrorResponse) {
        this.errorHandler.sendClientErrorResponse(res, 'Current password is incorrect');
    }

    private unknownError(res: KrossrErrorResponse, err: any) {
        this.errorHandler.sendUnknownClientErrorResponse(res, err);
    }
}
