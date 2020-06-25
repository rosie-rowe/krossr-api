import * as express from 'express';
import { UserProfileController } from '../controllers/users/UserProfileController';
import { SignInController } from '../controllers/users/SignInController';
import { SignOutController } from '../controllers/users/SignOutController';
import { IKrossrDatabase } from '../database/IKrossrDatabase';
import { SignUpController } from '../controllers/users/SignUpController';

export class UsersRoutes {
    private static userProfileController = new UserProfileController();
    private static signInController = new SignInController();
    private static signOutController = new SignOutController();

    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        let signUpController = new SignUpController(db);

        // Setting up the users profile api
        app.route('/users/me').get(this.userProfileController.me);
        app.route('/users').put(this.userProfileController.update);

        // Setting up the users authentication ap
        app.route('/auth/signin').post(this.signInController.signIn);
        app.route('/auth/signout').post(this.signOutController.signOut);
        app.route('/auth/signup').post(signUpController.signUp);
    }
}