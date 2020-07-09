import { ErrorHandler } from '../Error/ErrorHandler';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';
import { injectable, inject } from 'inversify';

@injectable()
export class SignUpController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    public signUp = (req, res) => {
        // Init Variables TODO
        let user = User.build(req.body);

        // Add missing user fields
        user.setPassword(req.body.password);

        // Then save the user
        user.save().then(() => {
            req.login(user, (err) => {
                if (err) {
                    return this.errorHandler.sendUnknownServerErrorResponse(res, err);
                }

                let result = this.userMapper.toViewModel(user);
                res.jsonp(result);
            });
        }).catch((err) => {
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        });
    }
}
