import { Sequelize, Model, DataTypes } from 'sequelize';
import { ModelConfiguration } from './ModelConfiguration';
import { injectable } from 'inversify';

interface RatingCreationAttributes {
    rating: number;
    levelId: number;
    userId: number;
}

interface RatingAttributes extends RatingCreationAttributes {
    id: number;
}

export class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
    public id!: number;
    public rating!: number;
    public levelId!: number;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

@injectable()
export class RatingConfiguration implements ModelConfiguration<Sequelize> {
    private compositeKey = 'oneRatingPerLevelPerUser';

    configure(sequelize: Sequelize) {
        Rating.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            rating: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: true,
                    min: 1,
                    max: 5
                }
            },
            levelId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: this.compositeKey
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: this.compositeKey
            }
        }, {
            tableName: 'ratings',
            sequelize
        });
    }
}
