'use strict';

module.exports = function(sequelize, Sequelize) {
    var rating = sequelize.define('rating', {
        rating: {
            type: Sequelize.INTEGER,
            validate: {
                isInt: true
            }
        }
    },
    {
        associate: function(models) {
            rating.belongsTo(models.level);
            rating.belongsTo(models.user);
        }
    });

    return rating;
};