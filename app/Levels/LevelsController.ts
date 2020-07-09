import { ErrorHandler } from '../Error/ErrorHandler';
import { Level } from '../models/LevelModel';
import { LevelRequest } from './LevelRequest';
import { Response } from 'express';
import { LevelViewModelMapper } from './LevelViewModelMapper';
import { inject, injectable } from 'inversify';
import { LevelService } from './LevelService';

@injectable()
export class LevelsController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(LevelService) private levelService: LevelService,
        @inject(LevelViewModelMapper) private levelMapper: LevelViewModelMapper
    ) {
    }

    /**
     * Create a Level
     */
    public create = (req: LevelRequest, res: Response) => {
        req.body.userId = req.user.id;

        Level.create(req.body).then((level) => {
            if (!level) {
                this.errorHandler.sendServerErrorResponse(res, 'There was a problem creating the level');
            } else {
                let result = this.levelMapper.toViewModel(level);
                return res.jsonp(result);
            }
        }).catch((err) => {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        });
    }

    /**
     * Delete a Level
     */
    public delete = async (req: LevelRequest, res: Response) => {
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
    public read = (req: LevelRequest, res: Response) => {
        let result = this.levelMapper.toViewModel(req.level);
        result.userRating = this.getUserRating(req);
        return res.jsonp(result);
    }

    public update = (req: LevelRequest, res: Response) => {
        return req.level.update({
            name: req.body.name,
            layout: req.body.decodedLayout,
            size: req.body.size
        }).then(level => {
            let result = this.levelMapper.toViewModel(level);
            return res.jsonp(result);
        }).catch(err => {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        });
    }

    private getUserRating(req: LevelRequest) {
        if (req.level.ratings && req.user) {
            return req.level.ratings.find(rating => rating.userId === req.user.id);
        }
    }
}
