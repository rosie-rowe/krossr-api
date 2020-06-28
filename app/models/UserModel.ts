'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';

let cryptoUser = require('crypto'); // renamed to avoid scope issues for now, TODO

interface UserCreationAttributes {
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

    authenticate(plainText: string) {
        return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
    }

    encryptPassword(password: string, salt: string) {
        if (!password || !salt) {
            return '';
        }
        let saltBuffer = new Buffer(salt, 'base64');
        return cryptoUser.pbkdf2Sync(password, saltBuffer, 10000, 64, null).toString('base64');
    }

    makeSalt() {
        return cryptoUser.randomBytes(16).toString('base64');
    }

    removeSensitiveInfo() {
        this.salt = null;
    }

    setPassword(newPassword: string) {
        this.provider = 'local';
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(newPassword, this.salt);
    }
}

export class UserConfiguration {
    public static init(sequelize: Sequelize) {
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

        // todo hasMany on Rating and Level
    }
}
