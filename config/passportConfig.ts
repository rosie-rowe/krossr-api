'use strict';

import { LocalPassportStrategy } from './strategies/local';
import * as passport from 'passport';
import { User } from '../app/models/UserModel';

export class PassportConfiguration {
    static configure() {
        // Serialize sessions
        // TODO typing
        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        });

        // Deserialize sessions
        passport.deserializeUser((id, done) => {
            User.findOne({
                attributes: {
                    exclude: ['salt', 'password'],
                },
                where: {
                    id
                }
            }).then((user) => {
                done(null, user);
            }).catch((err) => {
                done(err);
            });
        });

        LocalPassportStrategy.use();
    }
}
