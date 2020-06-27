'use strict';

import { LocalPassportStrategy } from './strategies/local';
import * as passport from 'passport';

export class PassportConfiguration {
    static configure(db) {
        let User = db.user;

        // Serialize sessions
        // TODO typing
        passport.serializeUser(function(user: any, done) {
            done(null, user.id);
        });

        // Deserialize sessions
        passport.deserializeUser(function(id, done) {
            User.findOne({
                exclude: ['salt', 'password'],
                where: {
                    id
                }
            }).then(function(user) {
                done(null, user);
            }).catch(function(err) {
                done(err);
            });
        });

        LocalPassportStrategy.use(db);
    }
}
