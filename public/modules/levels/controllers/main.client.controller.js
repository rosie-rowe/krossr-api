'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$scope', '$timeout', 'shiftService', 'tileSize', 'Utils',
    function ($scope, $timeout, shiftService, tileSize, Utils) {
    var _this = this;
            
    this.tileSize = tileSize + 'px';

    this.options = {
        size: 25
    };
      
    this.keydown = function(event) {
        //debugger;
        console.log("key down!");
        if (event.shiftKey) {
            shiftService.shiftOn = true;
        }
    };
      
    this.keyup = function(event) {
        console.log("key up!");
        if (!event.shiftKey) {
            shiftService.shiftOn = false;
        }
    };

    this.getSize = function() {
        return _this.flatten(Utils.getGameMatrix());
    };

    this.getLines = function(layout) {
        if (layout) {
            return layout;
        }
    };

    this.flatten = Utils.flatten;

    this.setGameSize = function() {
        Utils.setGameSize(_this.options.size);
    };

    this.createGameArray = function(controller) {
        Utils.createNewGame({
            numberOfTiles: parseInt(_this.options.size, 10),
            controller: controller
        });
    };

    this.clearAll = function() {
        var valueRoot = Math.sqrt(_this.options.size);
        Utils.clearAllTiles(_this.options.size);
        Utils.clearAllMatrix(Utils.getGameMatrix(), valueRoot);
    };

    this.calculateMargin = function(gameSize) {
        return parseInt(gameSize, 10) / 3;
    }
}]);
