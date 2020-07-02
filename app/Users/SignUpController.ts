import { ErrorHandler } from '../Error/ErrorHandler';
import { WinstonConfiguration } from '../../config/winston';
import { User } from '../models/UserModel';
import { UserViewModelMapper } from './UserViewModelMapper';

let winston = WinstonConfiguration.initialize();

export class SignUpController {
    constructor(
        private errorHandler: ErrorHandler,
        private userMapper: UserViewModelMapper
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
                    res.status(500).send({
                        message: this.errorHandler.getErrorMessage(err)
                    });
                } else {
                    let result = this.userMapper.toViewModel(user);
                    res.jsonp(result);
                }
            });
        }).catch((err) => {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }
}
