import { LevelListQuery } from './LevelListQuery';
import { Sequelize, Op } from 'sequelize';
import { Level } from '../models/LevelModel';
import { injectable, inject } from 'inversify';
import { LevelListSortByOptions } from './LevelListSortByOptions';
import { SizeOptions } from '../Size/SizeOptions';
import { SizeFormatter } from '../Size/SizeFormatter';
import { SortDirectionOptions } from '../SortDirection/SortDirectionOptions';
import { LevelListFilterSelectOptionsViewModel } from '@krossr/types';

@injectable()
export class LevelListService {
    constructor(
        @inject(SizeFormatter) private sizeFormatter: SizeFormatter
    ) {
    }

    public getOptions(): LevelListFilterSelectOptionsViewModel {
        let sortByOptions = {
            'Created Date': LevelListSortByOptions.CreatedDate,
            Name: LevelListSortByOptions.Name,
            Ratings: LevelListSortByOptions.Ratings
        };

        let sizeOptions = {
            All: ''
        };

        SizeOptions.Options.forEach(size => {
            sizeOptions[this.sizeFormatter.formatSize(size)] = size;
        });

        let sortDirectionOptions = {
            Ascending: SortDirectionOptions.ASC,
            Descending: SortDirectionOptions.DESC
        };

        return { sortByOptions, sizeOptions, sortDirectionOptions };
    }

    public getList(query: LevelListQuery) {
        let pageNum = parseInt(query.pageNum, 10);
        let sizeRestriction = query.sizeRestriction;
        let searchText = query.searchText;
        let sortBy = query.sortBy || LevelListSortByOptions.CreatedDate;
        let sortDirection = query.sortDirection || 'ASC';
        let numPerPage = parseInt(query.numPerPage, 10);

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
        let baseRatingQuery = '(SELECT AVG("ratings"."rating") FROM "ratings" WHERE "ratings"."levelId" = "Level"."id")';
        let ratingQuery = Sequelize.literal(baseRatingQuery);
        let ratingTest = Sequelize.literal(baseRatingQuery + ' IS NOT NULL');

        let isRating = (sortBy === LevelListSortByOptions.Ratings);

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
                include: [[ratingQuery, nameof<Level>(o => o.avgRating)]]
            },
            include: [
                {
                    association: Level.associations.user,
                    attributes: ['id', 'username']
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
