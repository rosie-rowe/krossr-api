import * as express from 'express';
import { UserProfileController } from '../controllers/users/users.profile.server.controller';
import { SignInController } from '../controllers/users/SignInController';

export class UsersRoutes {
    private static userProfileController = new UserProfileController();
    private static signInController = new SignInController();

    static configureRoutes(app: express.Application) {
        // Setting up the users profile api
        app.route('/users/me').get(this.userProfileController.me);
        app.route('/users').put(this.userProfileController.update);

        app.route('/auth/signin').post(this.signInController.signIn);
    }
}