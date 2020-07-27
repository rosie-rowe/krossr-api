import { Sequelize, Model, DataTypes, Association, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin } from 'sequelize';
import { User } from './UserModel';
import { Rating } from './RatingModel';
import { ModelConfiguration } from './ModelConfiguration';
import { injectable } from 'inversify';

export interface LevelCreationAttributes {
    name: string;
    layout: string;
    size: number;
    userId: number;
}

interface LevelAttributes extends LevelCreationAttributes {
    id: number;
}

export class Level extends Model<LevelAttributes, LevelCreationAttributes> implements LevelAttributes {
    public id!: number;
    public name!: string;
    public layout!: string;
    public size!: number;
    public userId!: number;

    // not saved in db table.
    public ratings?: Rating[];
    public avgRating?: string;
    public user?: User;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: BelongsToGetAssociationMixin<User>;

    // tslint:disable-next-line member-ordering
    public static associations: {
        user: Association<Level, User>,
        ratings: Association<Level, Rating>
    };
}

@injectable()
export class LevelConfiguration implements ModelConfiguration<Sequelize> {
    configure(sequelize: Sequelize) {
        Level.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    is: /[a-z\d\-_\s]+/i,
                    notEmpty: true,
                    isLongEnough(val: string) {
                        if (val.length < 6) {
                            throw new Error('Please choose a longer name');
                        }
                    }
                }
            },
            layout: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            size: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 25,
                validate: {
                    isInt: true
                }
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        }, {
            tableName: 'levels',
            sequelize
        });

        Level.belongsTo(User, {
            as: 'user'
        });

        Level.hasMany(Rating, {
            foreignKey: 'levelId',
            as: 'ratings'
        });
    }
}
