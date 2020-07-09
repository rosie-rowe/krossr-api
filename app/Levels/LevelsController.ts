import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelRequest } from './LevelRequest';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { LevelService } from './LevelService';
import { CreateLevelParamsViewModel, UpdateLevelParamsViewModel } from '@krossr/types';

@injectable()
export class LevelsController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(LevelService) private levelService: LevelService
    ) {
    }

    /**
     * Create a Level
     */
    public create = async (req: LevelRequest<CreateLevelParamsViewModel>, res: Response) => {
        try {
            let level = await this.levelService.createLevel(req.user, req.body);

            if (level) {
                res.jsonp(level);
            } else {
                this.errorHandler.sendServerErrorResponse(res, 'There was a problem creating the level');
            }
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    /**
     * Delete a Level
     */
    public delete = async (req: LevelRequest<void>, res: Response) => {
        try {
            await this.levelService.deleteLevel(req.level);
            return res.status(200).send();
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    /**
     * Show the current Level.
     */
    public read = async (req: LevelRequest<void>, res: Response) => {
        try {
            let result = await this.levelService.getLevel(req.user, req.level);
            return res.jsonp(result);
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }

    public update = async (req: LevelRequest<UpdateLevelParamsViewModel>, res: Response) => {
        try {
            let level = await this.levelService.updateLevel(req.level, req.body);
            return res.jsonp(level);
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }
}
