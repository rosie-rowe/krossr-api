import * as express from 'express';
import { UserProfileController } from '../controllers/users/UserProfileController';
import { SignInController } from '../controllers/users/SignInController';
import { SignOutController } from '../controllers/users/SignOutController';

export class UsersRoutes {
    private static userProfileController = new UserProfileController();
    private static signInController = new SignInController();
    private static signOutController = new SignOutController();

    static configureRoutes(app: express.Application) {
        // Setting up the users profile api
        app.route('/users/me').get(this.userProfileController.me);
        app.route('/users').put(this.userProfileController.update);

        app.route('/auth/signin').post(this.signInController.signIn);
        app.route('/auth/signout').post(this.signOutController.signOut);
    }
}