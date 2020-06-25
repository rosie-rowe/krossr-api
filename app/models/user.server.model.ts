'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, Sequelize) {
    var user = sequelize.define('user', {
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },
        hashedPassword: Sequelize.STRING,
        salt: Sequelize.STRING,
        provider: Sequelize.STRING,
        resetPasswordToken: Sequelize.STRING,
        resetPasswordExpires: Sequelize.DATE
    },
    {
        timestamps: true,
        associate: function(models) {
            user.hasMany(models.level);
            user.hasMany(models.rating);
        }
    });

    user.prototype.authenticate = function(plainText) {
        return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
    }

    user.prototype.encryptPassword = function(password, salt) {
        if (!password || !salt) {
            return '';
        }
        salt = new Buffer(salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, null).toString('base64');
    }

    user.prototype.makeSalt = function () {
        return crypto.randomBytes(16).toString('base64'); 
    }

    user.prototype.removeSensitiveInfo = function() {
        this.password = null;
        this.salt = null;
    }

    user.prototype.toJSON = function() {
        var values = this.get();
        delete values.hashedPassword;
        delete values.salt;
        return values;
    }

    user.prototype.setPassword = function(newPassword) {
        this.provider = 'local';
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(newPassword, this.salt);
    }


    return user;
};

 
