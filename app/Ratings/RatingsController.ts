import { Rating } from '../models/RatingModel';
import { ErrorHandler } from '../Error/ErrorHandler';
import { injectable } from 'inversify';

@injectable()
export class RatingsController {
    constructor(
        private errorHandler: ErrorHandler
    ) {
    }

    /**
     * Add or replace a Rating. Each user should only be able to have one rating for each level.
     */
    public upsertRating = (req, res) => {
        let level = req.level;
        let user = req.user;
        let rating = Rating.build(req.body); // TODO

        Rating.findOrCreate({
            where: {
                userId: user.id,
                levelId: level.id
            },
            defaults: {
                rating: rating.rating,
                levelId: level.id,
                userId: user.id
            }
        }).then((value) => {
            let created = value[1];

            if (!created) {
                return Rating.update({
                    rating: rating.rating
                }, {
                    where: {
                        userId: user.id,
                        levelId: level.id
                    }
                }).then(() => {
                    res.jsonp(level);
                }).catch((err) => {
                    this.errorHandler.sendUnknownServerErrorResponse(res, err);
                });
            } else {
                res.jsonp(level);
            }
        }).catch((err) => {
            this.errorHandler.sendUnknownServerErrorResponse(res, err);
        });
    }
}
