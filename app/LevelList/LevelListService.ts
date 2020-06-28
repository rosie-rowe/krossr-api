import { LevelListQuery } from './LevelListQuery';
import { Sequelize, Op } from 'sequelize';
import { Level } from '../models/LevelModel';

export class LevelListService {
    // This can be done WAY better, todo
    public getList(query: LevelListQuery) {
        let pageNum = query.pageNum;
        let sizeRestriction = query.sizeRestriction;
        let searchText = query.searchText;
        let sortBy = query.sortBy || '"createdAt"';
        let sortDirection = query.sortDirection || 'ASC';
        let numPerPage = query.numPerPage;

        let whereBuilder: any = {
            id: {
                [Op.not]: null
            }
        };

        /**
         * This may be able to be done better, but hey. Include the average rating of a level with the levels query,
         * rather than every ratings object for that level.
         * Also, exclude levels without average ratings if ratings are being filtered upon
         */
        let baseRatingQuery = '(SELECT AVG("ratings"."rating") FROM "ratings" WHERE "ratings"."levelId" = "level"."id")';
        let ratingQuery = Sequelize.literal(baseRatingQuery);
        let ratingTest = Sequelize.literal(baseRatingQuery + ' IS NOT NULL');

        let isRating = (sortBy === '"avgRating"');

        if (sizeRestriction) {
            whereBuilder.size = {
                [Op.eq]: sizeRestriction
            };
        }

        if (searchText) {
            searchText = '%' + searchText + '%';

            whereBuilder[Op.or] = [
                {
                    name: {
                        [Op.iLike]: searchText
                    }
                },
                Sequelize.where(Sequelize.col('user.username'), 'ILIKE', searchText)
            ];
        }

        return Level.findAndCountAll({
            attributes: {
                include: [[ratingQuery, 'avgRating']]
            },
            include: [
                {
                    association: Level.associations.user,
                    attributes: ['username']
                },
                Level.associations.ratings
            ],
            where: {
                [Op.and]: isRating ? [whereBuilder, ratingTest] : whereBuilder
            },
            limit: numPerPage,
            offset: pageNum * numPerPage,
            order: Sequelize.literal(`${sortBy} ${sortDirection}`)
        });
    }
}
