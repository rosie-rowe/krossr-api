import { ErrorHandler } from '../Error/ErrorHandler';
import { injectable, inject } from 'inversify';
import { UpsertRatingRequest } from './UpsertRatingRequest';
import { RatingsService } from './RatingsService';
import { Response } from 'express';

@injectable()
export class RatingsController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(RatingsService) private ratingsService: RatingsService
    ) {
    }

    public upsertRating = async (req: UpsertRatingRequest, res: Response) => {
        try {
            await this.ratingsService.upsertRating(req.level, req.user, req.body);
            res.send();
        } catch (err) {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }
}
