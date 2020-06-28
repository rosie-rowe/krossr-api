'use strict';

module.exports = (sequelize, Sequelize) => {
    let rating = sequelize.define('rating', {
        rating: {
            type: Sequelize.INTEGER,
            validate: {
                isInt: true
            }
        }
    },
    {
        associate(models) {
            rating.belongsTo(models.level);
            rating.belongsTo(models.user);
        }
    });

    return rating;
};
