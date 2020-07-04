'use strict';

import * as _ from 'lodash';
import { ErrorHandler } from '../Error/ErrorHandler';
import { UserRequest } from './UserRequest';
import { UserViewModelMapper } from './UserViewModelMapper';

export class UserProfileController {
    constructor(
        private errorHandler: ErrorHandler,
        private userMapper: UserViewModelMapper,
    ) {
    }

    /**
     * Update user details
     */
    update = async (req: UserRequest, res) => {
        // Init Variables
        let user = req.user;

        if (!user) {
            return this.errorHandler.sendClientErrorResponse(res, 'User is not signed in');
        }

        // For security measurement we remove the roles from the req.body object
        delete req.body.roles;

        // Merge existing user
        user.update({
            email: req.body.email
        });

        try {
            await user.save();

            req.login(user, (err) => {
                if (err) {
                    this.errorHandler.sendClientErrorResponse(res, this.errorHandler.getErrorMessage(err));
                } else {
                    let result = this.userMapper.toViewModel(user);
                    res.jsonp(result);
                }
            });
        } catch (err) {
            return this.errorHandler.sendClientErrorResponse(res, this.errorHandler.getErrorMessage(err));
        }
    }

    /**
     * Send User
     */
    me = (req: UserRequest, res) => {
        res.jsonp(req.user ? this.userMapper.toViewModel(req.user) : null);
    }
}
