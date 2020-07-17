import * as _ from 'lodash';
import { ErrorHandler } from '../Error/ErrorHandler';
import { UserRequest } from './UserRequest';
import { UserViewModelMapper } from './UserViewModelMapper';
import { injectable, inject } from 'inversify';
import { Response } from 'express';

@injectable()
export class UserProfileController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper,
    ) {
    }

    /**
     * Update user details
     */
    update = async (req: UserRequest, res: Response) => {
        // Init Variables
        let user = req.user;

        if (!user) {
            return this.errorHandler.sendClientErrorResponse(res, 'User is not signed in');
        }

        // Merge existing user
        user.update({
            email: req.body.email
        });

        try {
            await user.save();

            req.login(user, (err) => {
                if (err) {
                    this.errorHandler.sendUnknownClientErrorResponse(res, err);
                } else {
                    let result = this.userMapper.toViewModel(user);
                    res.jsonp(result);
                }
            });
        } catch (err) {
            this.errorHandler.sendUnknownClientErrorResponse(res, err);
        }
    }

    /**
     * Send User
     */
    me = (req: UserRequest, res: Response) => {
        res.jsonp(req.user ? this.userMapper.toViewModel(req.user) : null);
    }
}
