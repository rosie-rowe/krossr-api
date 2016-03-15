'use strict';

module.exports = function(sequelize, Sequelize) {
    var level = sequelize.define('level', {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '',       
            unique: true,
            validate: {
                is: /[a-z\d\-_\s]+/i,
                notEmpty: true,
                isLongEnough: function(val) {
                    if (val.length < 6) {
                        throw new Error('Please choose a longer name');
                    }
                }
            }
        },
        layout: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.BOOLEAN),
            unique: true
        },
        size: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 25,
            validate: {
                isInt: true
            }
        },
        lives: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
    },
    {
        timestamps: true,
        associate: function(models) {
            level.belongsTo(models.user);
            level.hasMany(models.rating);
        }
    });

    return level;
}; 
