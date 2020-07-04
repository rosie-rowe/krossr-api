import * as express from 'express';
import { LevelListController } from '../LevelList/LevelListController';
import { LevelsMiddleware } from '../Levels/LevelsMiddleware';
import { LevelsController } from '../Levels/LevelsController';
import { UsersMiddleware } from '../Users/UsersMiddleware';
import { RatingsController } from '../Ratings/RatingsController';
import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelViewModelMapper } from '../Levels/LevelViewModelMapper';

export class LevelsRoutes {
    static configureRoutes(app: express.Application) {
        let levelMapper = new LevelViewModelMapper();
        // TODO dependency injection
        let errorHandler = new ErrorHandler();
        let levelListController = new LevelListController(errorHandler);
        let levelsController = new LevelsController(errorHandler, levelMapper);
        let ratingsController = new RatingsController(errorHandler);
        let levelsMiddleware = new LevelsMiddleware(errorHandler);
        let usersMiddleware = new UsersMiddleware(errorHandler);

        // Levels Routes
        app.route('/levels')
            .get(levelListController.paginate)
            .post(usersMiddleware.requiresLogin, levelsController.create);

        app.route('/levels/:levelId')
            .get(levelsController.read)
            .put(usersMiddleware.requiresLogin, levelsMiddleware.hasAuthorization, levelsController.update)
            .delete(usersMiddleware.requiresLogin, levelsMiddleware.hasAuthorization, levelsController.delete);

        app.route('/levels/:levelId/ratings')
            .post(usersMiddleware.requiresLogin, ratingsController.upsertRating);

        // Finish by binding the Level middleware
        app.param('levelId', levelsMiddleware.levelByID);
    }
}
