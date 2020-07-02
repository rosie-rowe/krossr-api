import * as passport from 'passport';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';

export class SignInController {
    constructor(
        private userMapper: UserViewModelMapper
    ) {
    }

    public signIn = (req, res, next) => {
        passport.authenticate('local', (err, user: User, info) => {
            if (err || !user) {
                res.status(400).send(info);
            } else {
                req.login(user, (err) => {
                    if (err) {
                        // todo
                        res.status(400).send(err);
                    } else {
                        let result = this.userMapper.toViewModel(user);
                        res.jsonp(result);
                    }
                });
            }
        })(req, res, next);
    }
}
