'use strict';

var btoa = require('btoa');

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
            type: Sequelize.STRING,
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
    },
    {
        timestamps: true,
        hooks: {
            beforeValidate: function(level) {
                level.encodeLayout();
            }
        },
        associate: function(models) {
            level.belongsTo(models.user);
            level.hasMany(models.rating);
        }
    });

    /**
     * Converts the boolean array to a base64 encoded string.
     * There will be an equivalent method on the client-side called decodeLayout
     * to convert a base64 encoded string into a boolean array
     */
    level.prototype.encodeLayout = function () {
       /*
        * For some reason, this gets called twice when updating a level.
        * If the layout has already been encoded, it will throw an error if it is attempted to be re-encoded.
        * Therefore, just return
        */
        if (!Array.isArray(this.layout)) {
            return;
        }

        var converted = Array.prototype.concat.apply([], this.layout) // flatten
                                        .map(function(value) { return value ? '1' : '0'; })
                                        .join('');
                                        
        this.layout = btoa(converted);
    }

    return level;
}; 
