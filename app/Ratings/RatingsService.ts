import { Level } from '../models/LevelModel';
import { User } from '../models/UserModel';
import { RatingCreationAttributes, Rating } from '../models/RatingModel';
import { UpsertRatingBodyViewModel } from '@krossr/types';
import { injectable } from 'inversify';

@injectable()
export class RatingsService {
    /**
     * Add or replace a Rating. Each user should only be able to have one rating for each level.
     */
    async upsertRating(level: Level, user: User, rating: UpsertRatingBodyViewModel): Promise<void> {
        let attributes: RatingCreationAttributes = {
            levelId: level.id,
            userId: user.id,
            rating: rating.rating
        };

        let where = {
            userId: user.id,
            levelId: level.id
        };

        let value = await Rating.findOrCreate({
            where ,
            defaults: attributes
        });

        let created = value[1];

        if (created) {
            return Promise.resolve();
        }

        await Rating.update({
            rating: rating.rating
        }, { where });

        return Promise.resolve();
    }
}
