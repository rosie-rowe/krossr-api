import { ErrorHandler } from '../Error/ErrorHandler';
import { UserViewModelMapper } from '../Users/UserViewModelMapper';
import { injectable, inject } from 'inversify';
import { SignUpRequest } from './SignUpRequest';
import { SignUpService } from './SignUpService';

@injectable()
export class SignUpController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(SignUpService) private signUpService: SignUpService,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    public signUp = async (req: SignUpRequest, res) => {
        try {
            let user = await this.signUpService.signUp(req.body);

            req.login(user, (err) => {
                if (err) {
                    return this.errorHandler.sendUnknownServerErrorResponse(res, err);
                }

                let result = this.userMapper.toViewModel(user);
                res.jsonp(result);
            });
        } catch (err) {
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }
}
