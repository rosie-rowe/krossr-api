import * as express from 'express';
import { UserProfileController } from '../controllers/users/users.profile.server.controller';

export class UsersRoutes {
    private static userProfileController = new UserProfileController();

    static configureRoutes(app: express.Application) {
        // Setting up the users profile api
        app.route('/users/me').get(this.userProfileController.me);
        app.route('/users').put(this.userProfileController.update);
    }
}