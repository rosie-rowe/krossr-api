
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../app/models/UserModel';
import { injectable, inject } from 'inversify';
import { AuthenticationStrategy } from './AuthenticationStrategy';
import { PasswordService } from '../../app/Password/PasswordService';

@injectable()
export class LocalPassportStrategy implements AuthenticationStrategy {
    constructor(
        @inject(PasswordService) private passwordService: PasswordService
    ) {
    }

    use() {
        // Use local strategy
        passport.use(new LocalStrategy(
            (username, password, done) => {
                User.findOne({
                    where: {
                        username
                    }
                }).then(user => {
                    if (!user) { return done(null, false); }
                    if (!this.passwordService.authenticate(user, password)) { return done(null, false); }

                    return done(null, user);
                }).catch(err => {
                    if (err) { return done(err); }
                });
            }
        ));
    }
}
