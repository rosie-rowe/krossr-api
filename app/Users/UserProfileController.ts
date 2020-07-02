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
    update = (req, res) => {
        // Init Variables
        let user = req.user;

        // For security measurement we remove the roles from the req.body object
        delete req.body.roles;

        if (user) {
            // Merge existing user
            user.update({
                email: req.body.email
            });

            user.save().then(() => {
                req.login(user, (err) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        let result = this.userMapper.toViewModel(user);
                        res.jsonp(result);
                    }
                });
            }).catch((err) => {
                return res.status(400).send({
                    message: this.errorHandler.getErrorMessage(err)
                });
            });
        } else {
            res.status(400).send({
                message: 'User is not signed in'
            });
        }
    }

    /**
     * Send User
     */
    me = (req: UserRequest, res) => {
        res.jsonp(req.user ? this.userMapper.toViewModel(req.user) : null);
    }
}
