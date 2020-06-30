import { ErrorHandler } from '../Error/ErrorHandler';
import { User } from '../models/UserModel';

export class ChangePasswordController {
    constructor(
        private errorHandler: ErrorHandler
    ) {
    }

    public changePassword = async (req, res) => {
        // Init Variables
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
                        res.status(400).send(err);
                    } else {
                        res.send({
                            message: 'Password changed successfully'
                        });
                    }
                });
            } catch(err) {
                this.unknownError(res, err)
            }
        } catch (err) {
            this.unknownError(res, err);
        }
    }

    private newPasswordMissing(res) {
        res.status(400).send({
            message: 'Please provide a new password'
        });
    }

    private passwordsDoNotMatch(res) {
        res.status(400).send({
            message: 'Passwords do not match'
        });
    }

    private userIsNotSignedIn(res) {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }

    private userIsNotFound(res) {
        res.status(400).send({
            message: 'User is not found'
        });
    }

    private currentPasswordIsIncorrect(res) {
        res.status(400).send({
            message: 'Current password is incorrect'
        });
    }

    private unknownError(res, err) {
        res.status(400).send({
            message: this.errorHandler.getErrorMessage(err)
        });
    }
}
