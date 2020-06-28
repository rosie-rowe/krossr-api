import { IKrossrDatabase } from '../Database/IKrossrDatabase';

export class RatingsController {
    constructor(private db: IKrossrDatabase) {
    }

    /**
     * Add or replace a Rating. Each user should only be able to have one rating for each level.
     */
    public upsertRating = (req, res) => {
        let Rating = this.db.rating;
        let level = req.level;
        let user = req.user;
        let rating = Rating.build(req.body);

        /* Simulated composite primary key since Sequelize doesn't support them yet */
        Rating.findOrCreate({
            where: {
                userId: user.id,
                levelId: level.id
            },
            defaults: {
                rating: rating.rating
            }
        }).spread((result, created) => {
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
                }).catch(function(err) {
                    return res.status(500).send({
                        message: this.errorHandler.getErrorMessage(err)
                    });
                });
            } else {
                res.jsonp(level);
            }
        }).catch(function(err) {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }
}
