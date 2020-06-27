import * as express from 'express';
import { IKrossrDatabase } from '../Database/IKrossrDatabase';
import { LevelListController } from '../LevelList/LevelListController';
import { LevelsMiddleware } from '../Levels/LevelsMiddleware';
import { LevelsController } from '../Levels/LevelsController';
import { UsersMiddleware } from '../Users/UsersMiddleware';
import { RatingsController } from '../Ratings/RatingsController';
import { ErrorHandler } from '../Error/ErrorHandler';

export class LevelsRoutes {
    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        // TODO dependency injection
        let errorHandler = new ErrorHandler();
        let levelListController = new LevelListController(db, errorHandler);
        let levelsController = new LevelsController(db, errorHandler);
        let ratingsController = new RatingsController(db);
        let levelsMiddleware = new LevelsMiddleware(db);
        let usersMiddleware = new UsersMiddleware();

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
