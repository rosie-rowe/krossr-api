import * as passport from 'passport';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { ErrorHandler } from '../Error/ErrorHandler';

export class SignInController {
    constructor(
        private errorHandler: ErrorHandler,
        private userMapper: UserViewModelMapper
    ) {
    }

    public signIn = (req: KrossrRequest, res, next) => {
        passport.authenticate('local', (err, user: User, info) => {
            if (err || !user) {
                // todo
                res.status(400).send(info);
            } else {
                req.login(user, (err) => {
                    if (err) {
                        this.errorHandler.sendClientErrorResponse(res, this.errorHandler.getErrorMessage(err));
                    } else {
                        let result = this.userMapper.toViewModel(user);
                        res.jsonp(result);
                    }
                });
            }
        })(req, res, next);
    }
}
