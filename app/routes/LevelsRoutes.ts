import * as express from 'express';
import { IKrossrDatabase } from '../database/IKrossrDatabase';
import { LevelListController } from '../LevelList/LevelListController';
import { LevelsMiddleware } from '../Levels/LevelsMiddleware';
import { LevelsController } from '../Levels/LevelsController';
import { UsersMiddleware } from '../Users/UsersMiddleware';
import { RatingsController } from '../Ratings/RatingsController';

export class LevelsRoutes {
    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        let levelListController = new LevelListController(db);
        let levelsController = new LevelsController(db);
        let ratingsController = new RatingsController(db);
        let levelsMiddleware = new LevelsMiddleware(db);
        let usersMiddleware = new UsersMiddleware();

        // Levels Routes
        app.route('/levels')
            .get(levelListController.paginate)
            .post(usersMiddleware.requiresLogin, levelsController.create);

        app.route('/levels/:levelId')
            .get(levelsController.read);

        app.route('/levels/:levelId/ratings')
            .post(usersMiddleware.requiresLogin, ratingsController.upsertRating);

        // Finish by binding the Level middleware
        app.param('levelId', levelsMiddleware.levelByID);
    }
}