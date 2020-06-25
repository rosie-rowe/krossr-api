let passport = require('passport');

export class SignInController {
    public signIn = (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err || !user) {
                res.status(400).send(info);
            } else {
                user.removeSensitiveInfo();
    
                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.jsonp(user);
                    }
                });
            }
        })(req, res, next);
    }
}