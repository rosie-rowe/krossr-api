import { Rating } from '../models/RatingModel';

export class RatingsController {
    /**
     * Add or replace a Rating. Each user should only be able to have one rating for each level.
     */
    public upsertRating = (req, res) => {
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
                rating: rating.rating,
                levelId: level.id,
                userId: user.id
            }
        }).then((value) => {
            let rating = value[0];
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
