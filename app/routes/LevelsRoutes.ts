import * as express from 'express';
import { IKrossrDatabase } from '../database/IKrossrDatabase';
import { LevelListController } from '../LevelList/LevelListController';
import { LevelsMiddleware } from '../Levels/LevelsMiddleware';
import { LevelsController } from '../Levels/LevelsController';

export class LevelsRoutes {
    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        let levelListController = new LevelListController(db);
        let levelsController = new LevelsController();
        let levelMiddleware = new LevelsMiddleware(db);

        // Levels Routes
        app.route('/levels').get(levelListController.paginate);

        app.route('/levels/:levelId')
            .get(levelsController.read)

        // Finish by binding the Level middleware
        app.param('levelId', levelMiddleware.levelByID)
    }
}