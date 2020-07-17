import * as passport from 'passport';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { ErrorHandler } from '../Error/ErrorHandler';
import { inject, injectable } from 'inversify';
import { Response } from 'express';

@injectable()
export class SignInController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    // tslint:disable-next-line: ban-types
    public signIn = (req: KrossrRequest, res: Response, next: Function) => {
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
