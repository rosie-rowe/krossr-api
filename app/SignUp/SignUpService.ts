import { CreateUserBodyViewModel } from '@krossr/types';
import { UserCreationAttributes, User } from '../models/UserModel';
import { inject, injectable } from 'inversify';
import { PasswordService } from '../Password/PasswordService';

@injectable()
export class SignUpService {
    constructor(
        @inject(PasswordService) private passwordService: PasswordService,
    ) {
    }

    async signUp(params: CreateUserBodyViewModel): Promise<User> {
        let attributes: UserCreationAttributes = {
            email: params.email,
            username: params.username,
            provider: '',
            salt: '',
            hashedPassword: ''
        };

        let user = User.build(attributes);
        this.passwordService.setPassword(user, params.password);

        return await user.save();
    }
}
