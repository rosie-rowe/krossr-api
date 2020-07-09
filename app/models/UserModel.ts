'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';
import { ModelConfiguration } from './ModelConfiguration';
import { injectable } from 'inversify';

export interface UserCreationAttributes {
    email: string;
    username: string;
    hashedPassword: string;
    salt: string;
    provider: string;
}

interface UserAttributes extends UserCreationAttributes {
    id: number;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public username!: string;
    public hashedPassword!: string;
    public salt!: string;
    public provider!: string;

    public resetPasswordToken!: string | null;
    public resetPasswordExpires!: Date | null;
}

@injectable()
export class UserConfiguration implements ModelConfiguration<Sequelize> {
    configure(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            username: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isAlphanumeric: true
                }
            },
            hashedPassword: DataTypes.STRING,
            salt: DataTypes.STRING,
            provider: DataTypes.STRING,
            resetPasswordToken: DataTypes.STRING,
            resetPasswordExpires: DataTypes.DATE
        }, {
            tableName: 'users',
            sequelize
        });
    }
}
