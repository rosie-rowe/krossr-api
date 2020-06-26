import { LevelListQuery } from "./LevelListQuery";
import { IKrossrDatabase } from "../Database/IKrossrDatabase";
import { Op } from 'sequelize';

export class LevelListService {
    private db: IKrossrDatabase;

    constructor(db: IKrossrDatabase) {
        this.db = db;
    }

    // This can be done WAY better, todo
    public getList(query: LevelListQuery) {
        let Level = this.db.level;
        let Rating = this.db.rating;
        let User = this.db.user;
        let Sequelize = this.db.Sequelize;

        var pageNum = query.pageNum,
            sizeRestriction = query.sizeRestriction,
            searchText = query.searchText,
            sortBy = query.sortBy || '"createdAt"',
            sortDirection = query.sortDirection || 'ASC',
            numPerPage = query.numPerPage;

        var whereBuilder: any = {
            id: {
                [Op.not]: null
            }
        };

        /* This may be able to be done better, but hey. Include the average rating of a level with the levels query,
         * rather than every ratings object for that level. Also, exclude levels without average ratings if ratings are being filtered upon */
        var baseRatingQuery = '(SELECT AVG("ratings"."rating") FROM "ratings" WHERE "ratings"."levelId" = "level"."id")';
        var ratingQuery = Sequelize.literal(baseRatingQuery);
        var ratingTest = Sequelize.literal(baseRatingQuery + ' IS NOT NULL');

        var isRating = (sortBy === '"avgRating"');

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
                    model: Rating,
                    attributes: []
                },
                {
                    model: User,
                    attributes: ['username'],
                    required: true
                }
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