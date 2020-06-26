import * as express from 'express';
import { UserProfileController } from '../Users/UserProfileController';
import { SignInController } from '../Users/SignInController';
import { SignOutController } from '../Users/SignOutController';
import { IKrossrDatabase } from '../Database/IKrossrDatabase';
import { SignUpController } from '../Users/SignUpController';
import { ErrorHandler } from '../Error/errors.server.controller';

export class UsersRoutes {
    private static errorHandler = new ErrorHandler();
    private static signInController = new SignInController();
    private static signOutController = new SignOutController();

    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        let userProfileController = new UserProfileController(this.errorHandler);
        let signUpController = new SignUpController(db, this.errorHandler);

        // Setting up the users profile api
        app.route('/users/me').get(userProfileController.me);
        app.route('/users').put(userProfileController.update);

        // Setting up the users authentication ap
        app.route('/auth/signin').post(this.signInController.signIn);
        app.route('/auth/signout').post(this.signOutController.signOut);
        app.route('/auth/signup').post(signUpController.signUp);
    }
}