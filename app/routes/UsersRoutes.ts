import * as express from 'express';
import { UserProfileController } from '../Users/UserProfileController';
import { SignInController } from '../Users/SignInController';
import { SignOutController } from '../Users/SignOutController';
import { SignUpController } from '../Users/SignUpController';
import { ChangePasswordController } from '../Users/ChangePasswordController';
import { ForgotPasswordController } from '../Users/ForgotPasswordController';
import { ResetPasswordController } from '../Users/ResetPasswordController';
import { inject, injectable } from 'inversify';

@injectable()
export class UsersRoutes {
    constructor(
        @inject(ChangePasswordController) private changePasswordController: ChangePasswordController,
        @inject(ForgotPasswordController) private forgotPasswordController: ForgotPasswordController,
        @inject(ResetPasswordController) private resetPasswordController: ResetPasswordController,
        @inject(SignInController) private signInController: SignInController,
        @inject(SignOutController) private signOutController: SignOutController,
        @inject(SignUpController) private signUpController: SignUpController,
        @inject(UserProfileController) private userProfileController: UserProfileController
    ) {
    }

    configureRoutes(app: express.Application) {
        // Setting up the users profile api
        app.route('/users/me').get(this.userProfileController.me);
        app.route('/users').put(this.userProfileController.update);

        // Setting up the users authentication api
        app.route('/auth/signin').post(this.signInController.signIn);
        app.route('/auth/signout').post(this.signOutController.signOut);
        app.route('/auth/signup').post(this.signUpController.signUp);

        // Setting up the users password api
        app.route('/users/password').post(this.changePasswordController.changePassword);
        app.route('/auth/forgot').post(this.forgotPasswordController.forgot);

        app.route('/auth/reset/:token')
            .get(this.resetPasswordController.validateResetToken)
            .post(this.resetPasswordController.reset);
    }
}
