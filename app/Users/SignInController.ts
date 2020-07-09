import * as passport from 'passport';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { ErrorHandler } from '../Error/ErrorHandler';
import { inject, injectable } from 'inversify';

@injectable()
export class SignInController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    public signIn = (req: KrossrRequest, res, next) => {
        passport.authenticate('local', (error, user: User, info) => {
            if (error || !user) {
                this.errorHandler.sendUnknownClientErrorResponse(res, info);
            } else {
                req.login(user, (err) => {
                    if (err) {
                        this.errorHandler.sendUnknownClientErrorResponse(res, err);
                    } else {
                        let result = this.userMapper.toViewModel(user);
                        res.jsonp(result);
                    }
                });
            }
        })(req, res, next);
    }
}
