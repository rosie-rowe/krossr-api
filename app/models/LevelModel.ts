import { Sequelize, Model, DataTypes, BuildOptions, HasOneGetAssociationMixin, Association } from 'sequelize';
import { User } from './UserModel';
import { Rating } from './RatingModel';
let btoa = require('btoa');

interface LevelCreationAttributes {
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

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<User>;

    // tslint:disable-next-line member-ordering
    public static associations: {
        user: Association<Level, User>,
        ratings: Association<Level, Rating>
    };

    encodeLayout() {
        /*
         * For some reason, this gets called twice when updating a level.
         * If the layout has already been encoded, it will throw an error if it is attempted to be re-encoded.
         * Therefore, just return
         */
        if (!Array.isArray(this.layout)) {
            return;
        }

        let converted = Array.prototype.concat.apply([], this.layout) // flatten
            .map((value) => value ? '1' : '0')
            .join('');

        this.layout = btoa(converted);
    }
}

export class LevelConfiguration {
    public static init(sequelize: Sequelize) {
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
                    isLongEnough(val) {
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
            hooks: {
                beforeValidate(level) {
                    level.encodeLayout();
                }
            },
            sequelize
        });

        Level.hasOne(User, {
            sourceKey: 'id',
            foreignKey: 'userId',
            as: 'user'
        });

        // Level.hasMany(Rating, {
        //     foreignKey: 'levelId',
        //     as: 'ratings'
        // });
    }
}
