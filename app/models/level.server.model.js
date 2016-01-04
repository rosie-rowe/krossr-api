'use strict';

module.exports = function(sequelize, Sequelize) {
    var Level = sequelize.define('Level', {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '',       
            unique: true,
            validate: {
                isAlphanumeric: true,
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
        timeLimit: {
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
            Level.belongsTo(models.User);
            Level.hasMany(models.Rating);
        }
    });

    return Level;
}; 
