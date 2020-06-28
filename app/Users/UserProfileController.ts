'use strict';

import * as _ from 'lodash';
import { ErrorHandler } from '../Error/ErrorHandler';

export class UserProfileController {
    constructor(
        private errorHandler: ErrorHandler
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
                updated: Date.now(),
                email: req.body.email
            });

            user.save().then(() => {
                req.login(user, (err) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.jsonp(user);
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
    me = (req, res) => {
        res.jsonp(req.user || null);
    }
}
