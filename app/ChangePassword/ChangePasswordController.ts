import { ErrorHandler } from '../Error/ErrorHandler';
import { User } from '../models/UserModel';
import { KrossrErrorResponse } from '../KrossrResponse/KrossrErrorResponse';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { inject, injectable } from 'inversify';
import { ChangePasswordRequest } from './ChangePasswordRequest';

@injectable()
export class ChangePasswordController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler
    ) {
    }

    public changePassword = async (req: ChangePasswordRequest, res) => {
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

            if (!user.authenticate(passwordDetails.currentPassword)) {
                return this.currentPasswordIsIncorrect(res);
            }

            user.hashedPassword = user.encryptPassword(passwordDetails.newPassword, user.salt);

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

    private unknownError(res: KrossrErrorResponse, err) {
        this.errorHandler.sendUnknownClientErrorResponse(res, err);
    }
}
