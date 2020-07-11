import * as express from 'express';
import { LevelListController } from '../LevelList/LevelListController';
import { LevelsMiddleware } from '../Levels/LevelsMiddleware';
import { LevelsController } from '../Levels/LevelsController';
import { UsersMiddleware } from '../Users/UsersMiddleware';
import { RatingsController } from '../Ratings/RatingsController';
import { inject, injectable } from 'inversify';
import { RouteConfiguration } from './RouteConfiguration';

@injectable()
export class LevelsRoutes implements RouteConfiguration {
    constructor(
        @inject(LevelListController) private levelListController: LevelListController,
        @inject(LevelsController) private levelsController: LevelsController,
        @inject(RatingsController) private ratingsController: RatingsController,
        @inject(LevelsMiddleware) private levelsMiddleware: LevelsMiddleware,
        @inject(UsersMiddleware) private usersMiddleware: UsersMiddleware
    ) {
    }

    configureRoutes(app: express.Application) {
        app.route('/levels/options')
            .get(this.levelListController.getOptions);

        // Levels Routes
        app.route('/levels')
            .get(this.levelListController.paginate)
            .post(this.usersMiddleware.requiresLogin, this.levelsController.create);

        app.route('/levels/:levelId')
            .get(this.levelsController.read)
            .put(this.usersMiddleware.requiresLogin, this.levelsMiddleware.hasAuthorization, this.levelsController.update)
            .delete(this.usersMiddleware.requiresLogin, this.levelsMiddleware.hasAuthorization, this.levelsController.delete);

        app.route('/levels/:levelId/ratings')
            .post(this.usersMiddleware.requiresLogin, this.ratingsController.upsertRating);

        // Finish by binding the Level middleware
        app.param('levelId', this.levelsMiddleware.levelByID);
    }
}
