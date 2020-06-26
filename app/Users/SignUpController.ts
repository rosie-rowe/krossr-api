import { ErrorHandler } from '../Error/errors.server.controller';
import { WinstonConfiguration } from '../../config/winston';
import { IKrossrDatabase } from '../Database/IKrossrDatabase';

let winston = WinstonConfiguration.initialize();

export class SignUpController {
    constructor(
        private db: IKrossrDatabase,
        private errorHandler: ErrorHandler
    ) {
    }

    public signUp = (req, res) => {
        let User = this.db.user;

        // Init Variables
        var user = User.build(req.body);

        // Add missing user fields
        user.setPassword(req.body.password);

        winston.info('About to save the user...');

        // Then save the user 
        user.save().then(() => {
            winston.info('Saved the user!');

            user.removeSensitiveInfo();

            req.login(user, (err) => {
                if (err) {
                    res.status(500).send({
                        message: this.errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(user);
                }
            });
        }).catch((err) => {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }
}