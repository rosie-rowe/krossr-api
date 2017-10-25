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
            beforeValidate: function(level, options) {
                level.encodeLayout();
            }
        },
        associate: function(models) {
            level.belongsTo(models.user);
            level.hasMany(models.rating);
        },
        instanceMethods: {
            /**
             * Converts the boolean array to a base64 encoded string.
             * There will be an equivalent method on the client-side called decodeLayout
             * to convert a base64 encoded string into a boolean array
             */
            encodeLayout: function() {
                var converted = Array.prototype.concat.apply([], this.layout) // flatten
                                               .map(function(value) { return value ? '1' : '0' })
                                               .join('');
                                               
                this.layout = btoa(converted);
            }
        } 
    });

    return level;
}; 
