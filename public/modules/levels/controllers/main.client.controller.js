'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$scope', '$timeout', 'shiftService', 'Utils',
    function ($scope, $timeout, shiftService, Utils) {
    var _this = this;
            
    this.tileSize = Utils.getTileSizePx();
    this.margin = Utils.getTileSizePx() / 2;

    $scope.$on('tileSizeChanged', function(e, args) {
        _this.tileSize = args + 'px';
        _this.margin = args / 2;
    });

    this.options = {
        size: 25
    };

    this.flatten = Utils.flatten;
      
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

    this.getMargin = function(side, tileSize) {
        switch (side) {
            default:
                return tileSize / 2;
                break;
        }
    };

    this.setGameSize = function() {
        Utils.setGameSize(Math.sqrt(_this.options.size));
    };

    this.createGameArray = function(controller) {
        Utils.createNewGame({
            numberOfTiles: parseInt(_this.options.size, 10),
            controller: controller
        });
    };

    this.clearAll = function() {
        var currentGameMatrix = Utils.getGameMatrix();
        
        Utils.clearAllTiles();
        Utils.clearAllMatrix(currentGameMatrix, currentGameMatrix.length);
        Utils.clearTileIndex();
    };

    this.calculateMargin = function(gameSize) {
        return Utils.getPlayableArea() - Utils.getGameSize();
    };

    this.getFontSize = function() {
        return parseInt(_this.tileSize, 10) / 2 + 'px';
    };
}]);
