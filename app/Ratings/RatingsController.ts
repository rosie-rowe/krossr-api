import { IKrossrDatabase } from "../database/IKrossrDatabase";

export class RatingsController {
    constructor(private db: IKrossrDatabase) {
    }

    /**
     * Add or replace a Rating. Each user should only be able to have one rating for each level.
     */
    public upsertRating = (req, res) => {
        let Rating = this.db.rating;
        var level = req.level;
        var user = req.user;
        var rating = Rating.build(req.body);

        /* Simulated composite primary key since Sequelize doesn't support them yet */
        Rating.findOrCreate({
            where: {
                userId: user.id,
                levelId: level.id
            },
            defaults: {
                rating: rating.rating
            }
        }).spread(function (result, created) {
            if (!created) {
                return Rating.update({
                    rating: rating.rating
                }, {
                    where: {
                        userId: user.id,
                        levelId: level.id
                    }
                }).then(function () {
                    res.jsonp(level);
                }).catch(function (err) {
                    return res.status(500).send({
                        message: this.errorHandler.getErrorMessage(err)
                    });
                });
            } else {
                res.jsonp(level);
            }
        }).catch(function (err) {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }
}