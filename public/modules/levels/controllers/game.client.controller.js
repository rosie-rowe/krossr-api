'use strict';

var gameController = function($scope, $timeout, Utils, ngDialog, dragBoxService) {
    var _this = this;

    $scope.controllerName = 'game';

    this.clearDragBox = function() {
        _this.dragBox = dragBoxService.newDragBox();
    }

    this.checkWin = function() {
        var winner = _this.checkForWin(Utils);

        if (winner && !$scope.level.lost) {
            $scope.level.won = true;
            $scope.$digest();
            return true;
        }
        return false;
    };

    this.convertTo1D = function(index) {
        return Utils.convertTo1D(index, Utils.getSideLength());
    };

    this.convertTo2D = function(index) {
        return Utils.convertTo2D(index, Utils.getSideLength());
    };

    this.gameOver = function() {
        if (!$scope.level.lost) {
            $scope.level.won = false;
            $scope.level.lost = true;
            _this.openWinLoseNotification();
        }
    };

    this.getGameMatrix = Utils.getGameMatrix;
    this.getGameSize = Utils.getGameSize;
    this.getTileIndex = Utils.getTileIndex;

    this.openWinLoseNotification = function() {
        ngDialog.open({
            template: "modules/levels/views/win-notification.client.view.html",
            scope: $scope
        });
    };

    this.processDragBox = function() {
        return _this.dragBox.process();
    };

    this.updateGameSize = function() {
        // don't use args, call to getGameSize so we take tutorials into account
        var newGameSettings = Utils.getGameSize($scope.tutorialMode);

        if (newGameSettings) {
            _this.gameSettings = {
                width: newGameSettings.gameWidth,
                height: newGameSettings.gameHeight 
            }
        }
    };

    $scope.$on('gameSizeChanged', function() {
        _this.updateGameSize.call(_this);
    });

    this.clearDragBox();
};

gameController.$inject = ['$scope', '$timeout', 'Utils', 'ngDialog', 'dragBoxService'];

/*
* Compare the current state of the game to the correct state
*/
gameController.prototype.checkForWin = function(Utils) {
    var goalMatrix = Utils.getGoalMatrix();
    var gameMatrix = Utils.getGameMatrix();

    if (typeof goalMatrix !== 'undefined') {
        var result = (angular.equals(goalMatrix, gameMatrix));

        if (result) {
            return true;
        }
    }
    return false;
};

/* Grab a tile controller out of the tile index from a given 2D coordinate */
gameController.prototype.findTileCtrlByCoord = function(coord) {
    var index = this.convertTo1D(coord);
    return this.findTileCtrlByIndex(index);
};

/* Grab a tile controller out of the tile index from a given 1D index */
gameController.prototype.findTileCtrlByIndex = function(index) {
  var tileIndex = this.getTileIndex();
  return tileIndex[index].tileCtrl;
};

/*
* Fill all of the tiles in the current (passed-in) dragBox
*/
gameController.prototype.fillDragBox = function(dragBox, override) {
    if (dragBox && dragBox.startCoord && dragBox.endCoord) {
        var initState = dragBox.initState;
        var coords = dragBox.process();

        this.fillTiles(coords, initState, override);
        this.clearDragBox();
    }
};

/*
* Fill all of the tiles in the specified coordinate array
* @params {Array} array of coordinate objects
* @params {function} a function to run on each tile controller before changing it to determine whether or not to change. must be defined in tile.client.controller.js
*/
gameController.prototype.fillTiles = function(coords, initState, override, validationFn) {
    var len = coords.length;
    var i = 0;
    var currentCoord;
    var currentTileController;

    for (; i < len; i++) {
        currentCoord = coords[i];
        currentTileController = this.findTileCtrlByCoord(currentCoord);

        if (!validationFn || (typeof currentTileController[validationFn] === 'function' && currentTileController[validationFn]())) {
            currentTileController.change(currentCoord, initState, override);
        }
    }
}

angular
    .module('levels')
        .controller('gameController', gameController);