'use strict';

import * as passport from 'passport';
import { User } from '../app/models/UserModel';
import { multiInject, injectable } from 'inversify';
import { AuthenticationStrategySymbols } from './strategies/AuthenticationStrategySymbols';
import { AuthenticationStrategy } from './strategies/AuthenticationStrategy';

@injectable()
export class PassportConfiguration {
    constructor(
        @multiInject(AuthenticationStrategySymbols.AuthenticationStrategy) private strategies: AuthenticationStrategy[]
    ) {
    }

    configure() {
        // Serialize sessions
        passport.serializeUser((user: User, done) => {
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

        this.strategies.forEach(strat => strat.use());
    }
}
