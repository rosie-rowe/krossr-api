'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('User', {
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
        instanceMethods: {
            toJSON: function() {
                var values = this.get();
                delete values.hashedPassword;
                delete values.salt;
                return values;
            },
            makeSalt : function() {
                return crypto.randomBytes(16).toString('base64'); 
            },
            authenticate: function(plainText) {
                return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
            },
            encryptPassword: function(password, salt) {
                if (!password || !salt) {
                    return '';
                }
                salt = new Buffer(salt, 'base64');
                return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            }
        },
        associate: function(models) {
            User.hasMany(models.Level);
            User.hasMany(models.Rating);
        }
    });

    return User;
};

 
