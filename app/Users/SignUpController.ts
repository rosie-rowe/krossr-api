import { ErrorHandler } from '../Error/ErrorHandler';
import { WinstonConfiguration } from '../../config/winston';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';
import { injectable, inject } from 'inversify';

let winston = WinstonConfiguration.initialize();

@injectable()
export class SignUpController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    public signUp = (req, res) => {
        // Init Variables
        let user = User.build(req.body);

        // Add missing user fields
        user.setPassword(req.body.password);

        winston.info('About to save the user...');

        // Then save the user
        user.save().then(() => {
            winston.info('Saved the user!');

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
