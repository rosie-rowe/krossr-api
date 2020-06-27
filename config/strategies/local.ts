
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export class LocalPassportStrategy {
    public static use(db) {
        let User = db.user;

        // Use local strategy
        passport.use(new LocalStrategy(
            (username, password, done) => {
                User.findOne({
                    where: {
                        username
                    }
                }).then(user => {
                    if (!user) { return done(null, false); }
                    if (!user.authenticate(password)) { return done(null, false); }

                    return done(null, user);
                }).catch(err => {
                    if (err) { return done(err); }
                });
            }
        ));
    }
}
