import { ErrorHandler } from '../Error/ErrorHandler';
import { Level } from '../models/LevelModel';
import { LevelRequest } from './LevelRequest';
import { Response } from 'express';
import { LevelViewModelMapper } from './LevelViewModelMapper';

export class LevelsController {
    constructor(
        private errorHandler: ErrorHandler,
        private levelMapper: LevelViewModelMapper
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
            this.errorHandler.sendServerErrorResponse(res, this.errorHandler.getErrorMessage(err));
        });
    }

    /**
     * Delete a Level
     */
    public delete = (req: LevelRequest, res: Response) => {
        let level = req.level;

        level.destroy().then(() => {
            return res.status(200).send();
        }).catch(function(err) {
            this.errorHandler.sendServerErrorResponse(res, this.errorHandler.getErrorMessage(err));
        });
    }

    /**
     * Show the current Level.
     */
    public read = (req: LevelRequest, res: Response) => {
        let result = this.levelMapper.toViewModel(req.level);

        // todo revisit this
        if (req.level.ratings && req.user) {
            result.userRating = req.level.ratings[0];
        }

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
            this.errorHandler.sendServerErrorResponse(res, this.errorHandler.getErrorMessage(err));
        });
    }
}
