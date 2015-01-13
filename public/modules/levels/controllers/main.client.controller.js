'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$rootScope', '$scope', '$timeout', 'shiftService', 'tileSize',
    function ($rootScope, $scope, $timeout, shiftService, tileSize) {
    var _this = this;
            
    $rootScope.gameIsWon = false;
    this.tileSize = tileSize + 'px';

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
