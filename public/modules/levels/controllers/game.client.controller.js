'use strict';

var gameController = function($scope, $timeout, Utils, ngDialog) {
    var _this = this;

    this.gameIsWon = false;
    this.gameIsLost = false;
    this.winTime = 0;

    this.clearDragBox();

    this.checkWin = function() {
      var winner = _this.checkForWin(Utils);
      if (winner) {
        _this.gameIsWon = true;
        Utils.stopTimer();
        $scope.$digest();
        return true;
      }
      return false;
    };

    this.convertTo1D = function(index) {
      return Utils.convertTo1D(index, Utils.getSideLength());
    }

    this.convertTo2D = function(index) {
      return Utils.convertTo2D(index, Utils.getSideLength());
    }

    this.getGameMatrix = Utils.getGameMatrix;
    this.getGameSize = Utils.getGameSize;
    this.getTileIndex = Utils.getTileIndex;
    this.indexTiles = Utils.indexTiles.bind(Utils);
    this.resetTimer = Utils.resetTimer;
    this.startTimer = Utils.startTimer;

    this.setWinTime = function(time) {
      _this.winTime = Utils.setWinTime(time);
      $scope.$digest();
    }

    this.updateGameSize = function() {
      // don't use args, call to getGameSize so we take tutorials into account
      var newGameSettings = Utils.getGameSize($scope.tutorialMode);

      if (newGameSettings) {
        _this.gameSettings = {
          width: newGameSettings.gameWidth,
          height: newGameSettings.gameHeight 
        }
      }
    }

    $scope.$on('gameSizeChanged', function() {
        _this.updateGameSize.call(_this);
    });

    // as far as I know, this has to be an event since it's triggered by a timer expiring.
    // if I think of a way to use the service better instead, I'll change it
    $scope.$on('gameOver', function() {
      if (!_this.gameIsLost) {
        $scope.openWinLoseNotification();
        _this.gameIsLost = true;
      }
    });
};

gameController.$inject = ['$scope', '$timeout', 'Utils', 'ngDialog'];

gameController.prototype.checkForWin = function(Utils) {
  var goalMatrix = Utils.getGoalMatrix(),
      gameMatrix = Utils.getGameMatrix();

  if (typeof goalMatrix !== 'undefined') {
    var result = (angular.equals(goalMatrix, gameMatrix));
    if (result) {
      return true;
    }
  }
  return false;
};

gameController.prototype.findTileCtrlByCoord = function(coord) {
  var index = this.convertTo1D(coord);
  return this.findTileCtrlByIndex(index);
}

gameController.prototype.findTileCtrlByIndex = function(index) {
  var tileIndex = this.getTileIndex();
  return tileIndex[index].tileCtrl;
}

gameController.prototype.processDragBox = function(dragBox) {
  var startX = dragBox.startCoord.x,
      startY = dragBox.startCoord.y,
      endX = dragBox.endCoord.x,
      endY = dragBox.endCoord.y,
      finalCoords = [];

      //todo: make this a function. tricky javascript makes easy problem harder.
      if (startX > endX) {
        var temp = startX;
        startX = endX;
        endX = temp;
      }

      if (startY > endY) {
        var temp = startY;
        startY = endY;
        endY = temp;
      }

      for (var i = startY; i <= endY; i++) {
        for (var j = startX; j <= endX; j++) {
          var coord = {
            x: j,
            y: i
          };

          finalCoords.push(coord);
        }
      }

    return finalCoords;
};

gameController.prototype.clearDragBox = function() {
  this.dragBox = {};
};

angular
    .module('levels')
        .controller('gameController', gameController);