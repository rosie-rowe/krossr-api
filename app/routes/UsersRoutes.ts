import * as express from 'express';
import { UserProfileController } from '../Users/UserProfileController';
import { SignInController } from '../Users/SignInController';
import { SignOutController } from '../Users/SignOutController';
import { SignUpController } from '../Users/SignUpController';
import { ErrorHandler } from '../Error/ErrorHandler';
import { ChangePasswordController } from '../Users/ChangePasswordController';
import { ForgotPasswordController } from '../Users/ForgotPasswordController';
import { ResetPasswordController } from '../Users/ResetPasswordController';
import { UserViewModelMapper } from '../Users/UserViewModelMapper';

export class UsersRoutes {
    private static userMapper = new UserViewModelMapper();
    private static errorHandler = new ErrorHandler();
    private static signOutController = new SignOutController();

    static configureRoutes(app: express.Application) {
        let userProfileController = new UserProfileController(this.errorHandler, this.userMapper);
        let signInController = new SignInController(this.errorHandler, this.userMapper);
        let signUpController = new SignUpController(this.errorHandler, this.userMapper);
        let changePasswordController = new ChangePasswordController(this.errorHandler);
        let forgotPasswordController = new ForgotPasswordController(this.errorHandler);
        let resetPasswordController = new ResetPasswordController(this.errorHandler, this.userMapper);

        // Setting up the users profile api
        app.route('/users/me').get(userProfileController.me);
        app.route('/users').put(userProfileController.update);

        // Setting up the users authentication ap
        app.route('/auth/signin').post(signInController.signIn);
        app.route('/auth/signout').post(this.signOutController.signOut);
        app.route('/auth/signup').post(signUpController.signUp);

        // Setting up the users password api
        app.route('/users/password').post(changePasswordController.changePassword);
        app.route('/auth/forgot').post(forgotPasswordController.forgot);

        app.route('/auth/reset/:token')
            .get(resetPasswordController.validateResetToken)
            .post(resetPasswordController.reset);
    }
}
