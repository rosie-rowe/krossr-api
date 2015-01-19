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
        console.log("key down! " + event)
        if (event.shiftKey) {
            shiftService.shiftOn = true;
        }
    };
      
    this.keyup = function(event) {
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
        $scope.$broadcast('gameSizeChanged', { numberOfTiles: parseInt(_this.options.size, 10) });
    };

    this.createGameArray = function(controller) {
        $scope.$broadcast('createNewGame', {
            numberOfTiles: parseInt(_this.options.size, 10),
            controller: controller
        });
    };

    this.clearAll = function() {
        $scope.$broadcast('clearAll', { numberOfTiles: parseInt(_this.options.size, 10) });
    };

    this.calculateMargin = function(gameSize) {
        return parseInt(gameSize, 10) / 3;
    }

    $scope.$on('gameSizeUpdated', function(event, args) {
        _this.gameSize = args.width;
    });
}]);
