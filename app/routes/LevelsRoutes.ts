import * as express from 'express';
import { IKrossrDatabase } from '../database/IKrossrDatabase';
import { LevelListController } from '../LevelList/LevelListController';

export class LevelsRoutes {
    static configureRoutes(app: express.Application, db: IKrossrDatabase) {
        let levelListController = new LevelListController(db);

        // Levels Routes
        app.route('/levels').get(levelListController.paginate);
    }
}