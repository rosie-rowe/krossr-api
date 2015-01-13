'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$rootScope', '$scope', '$timeout', 'shiftService',
    function ($rootScope, $scope, $timeout, shiftService) {
    var _this = this;
            
    $rootScope.gameIsWon = false;
    $rootScope.tile = {
        width: 25,
        height: 25
    };

    $rootScope.options = {
        size: 25,
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
        return _this.flatten($rootScope.gameMatrix);
    };

    this.getLineContent = function(index) {
        console.log($rootScope.goalMatrix[index]);
    }

    this.getLines = function(layout) {
        if (layout) {
            return layout;
        }
    };

    this.flatten = function(matrix) {
        return Array.prototype.concat.apply([], matrix);
    };

    this.setGameSize = function() {
        $rootScope.$broadcast('gameSizeChanged', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    };

    this.createGameArray = function(controller) {
        $rootScope.$broadcast('createNewGame', {
            numberOfTiles: parseInt($rootScope.options.size, 10),
            controller: controller
        });
    };

    this.clearAll = function() {
        $rootScope.$broadcast('clearAll', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    };

    this.calculateMargin = function(gameSize) {
        return parseInt(gameSize, 10) / 3;
    }

    $scope.$on('gameSizeUpdated', function(event, args) {
        _this.gameSize = args.width;
    });
}]);
