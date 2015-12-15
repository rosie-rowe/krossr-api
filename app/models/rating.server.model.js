'use strict';

module.exports = function(sequelize, Sequelize) {
    var Rating = sequelize.define('Rating', {
        rating: {
            type: Sequelize.INTEGER,
            validate: {
                isInt: true
            }
        }
    },
    {
        associate: function(models) {
            Rating.belongsTo(models.Level);
            Rating.belongsTo(models.User);
        }
    });

    return Rating;
};