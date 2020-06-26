import { IKrossrDatabase } from "../Database/IKrossrDatabase";
import { ErrorHandler } from "../Error/errors.server.controller";

export class ChangePasswordController {
    constructor(
        private db: IKrossrDatabase,
        private errorHandler: ErrorHandler
    ) {
    }

    /** Holy shit callback hell. TODO! */
    public changePassword = (req, res) => {
        let User = this.db.user;

        // Init Variables
        var passwordDetails = req.body;

        if (req.user) {
            if (passwordDetails.newPassword) {
                User.findOne({
                    where: {
                        id: req.user.id
                    }
                }).then(function (user) {
                    if (!user) {
                        res.status(400).send({
                            message: 'User is not found'
                        });
                    } else {
                        if (user.authenticate(passwordDetails.currentPassword)) {
                            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                                user.hashedPassword = user.encryptPassword(passwordDetails.newPassword, user.salt);

                                user.save().then(function () {
                                    req.login(user, function (err) {
                                        if (err) {
                                            res.status(400).send(err);
                                        } else {
                                            res.send({
                                                message: 'Password changed successfully'
                                            });
                                        }
                                    });
                                }).catch((err) => {
                                    return res.status(400).send({
                                        message: this.errorHandler.getErrorMessage(err)
                                    });
                                });
                            } else {
                                res.status(400).send({
                                    message: 'Passwords do not match'
                                });
                            }
                        } else {
                            res.status(400).send({
                                message: 'Current password is incorrect'
                            });
                        }
                    }
                }).catch((err) => {
                    res.status(400).send({
                        message: this.errorHandler.getErrorMessage(err)
                    });
                });
            } else {
                res.status(400).send({
                    message: 'Please provide a new password'
                });
            }
        } else {
            res.status(400).send({
                message: 'User is not signed in'
            });
        }
    }
}