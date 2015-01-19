'use strict';

var gameController = function($scope, Utils, tileSize) {
    var _this = this;

    this.gameIsWon = false;
    this.clearDragBox();

    this.checkWin = function() {
      var winner = _this.checkForWin(Utils);
      if (winner) {
        _this.gameIsWon = true;
        $scope.$digest();
      }
    };

    this.getWidth = function() {
      return Utils.getGameSize().gameWidth;  
    }

    this.getHeight = function() {
      return Utils.getGameSize().gameHeight;
    }

    this.convertTo1D = function(index) {
      return Utils.convertTo1D(index, Utils.getSideLength());
    }

    this.convertTo2D = function(index) {
      return Utils.convertTo2D(index, Utils.getSideLength());
    }

    this.getGameMatrix = Utils.getGameMatrix;

    this.getTileIndex = Utils.getTileIndex;

    this.indexTiles = Utils.indexTiles.bind(Utils);
};

gameController.$inject = ['$scope', 'Utils', 'tileSize'];

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

gameController.prototype.calculateMargin = function(width) {
  return parseInt(width, 10) / 3;
};



angular
    .module('levels')
        .controller('gameController', gameController);