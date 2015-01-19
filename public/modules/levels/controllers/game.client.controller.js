'use strict';

var gameController = function($scope, Utils, tileSize) {
    var _this = this;

    this.gameIsWon = false;
    this.setGameSize($scope, 25, tileSize);
    this.clearDragBox();

    this.checkWin = function() {
      var winner = _this.checkForWin(Utils);
      if (winner) {
        _this.gameIsWon = true;
        $scope.$digest();
      }
    };

    this.convertTo1D = function(index) {
      return Utils.convertTo1D(index, Utils.getSideLength());
    }

    this.convertTo2D = function(index) {
      return Utils.convertTo2D(index, Utils.getSideLength());
    }

    this.getGameMatrix = Utils.getGameMatrix;

    this.tileIndex = [];

    this.processDragBox = function(dragBox) {
      return _this.handleDragBox(dragBox);
    };

    $scope.$on('gameSizeChanged', function(event, args) {
      _this.setGameSize($scope, args.numberOfTiles, tileSize);
    });

    $scope.$on('createNewGame', function(event, args) {
      if (args.layout) {
        _this.loadGameFromLayout(args.layout, Utils);
      } 

      _this.createEmptyMatrix(args.numberOfTiles, Utils);

      /* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
          then get rid of the goal matrix (since we don't want to be able to win while editing) */
      if (args.controller === 'edit') {
          Utils.setGameMatrix(Utils.getGoalMatrix());
          Utils.setGoalMatrix();
      }
    });

    $scope.$on('clearAll', function(event, args) {
      var valueRoot = Math.sqrt(args.numberOfTiles);
      _this.gameMatrix = _this.clearAllMatrix(Utils.getGameMatrix(), valueRoot)
    });
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
  return this.tileIndex[index].tileCtrl;
}

gameController.prototype.handleDragBox = function(dragBox) {
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
  console.log('dragbox cleared');
};

gameController.prototype.setGameSize = function($scope, value, tileSize) {
    var valueRoot = Math.sqrt(value),
        finalWidth = tileSize * valueRoot,
        finalHeight = tileSize * valueRoot;

    this.width = finalWidth + 2 + 'px';
    this.height = finalHeight + 'px';
    $scope.$emit('gameSizeUpdated', { width: this.width });
};

gameController.prototype.createEmptyMatrix = function(value, Utils) {
  var valueRoot = Math.sqrt(value),
      finalMatrix = [];

  for (var i = 0; i < valueRoot; i++) {
    finalMatrix.push(new Array(valueRoot));
  }

  finalMatrix = this.clearAllMatrix(finalMatrix, valueRoot);
  Utils.setGameMatrix(finalMatrix);
  console.log(Utils.getGameMatrix());
};

gameController.prototype.calculateMargin = function(width) {
  return parseInt(width, 10) / 3;
};

gameController.prototype.loadGameFromLayout = function(layout, Utils) {
  Utils.setGoalMatrix(layout);
  console.log("Game loaded!");
  console.log(layout);
};

gameController.prototype.clearAllMatrix = function(matrix, value) {
  for (var i = 0; i < value; i++) {
    var len = matrix[i].length
    for (var j = 0; j < len; j++) {
      matrix[i][j] = false;
    }
  }

  return matrix;
};

angular
    .module('levels')
        .controller('gameController', gameController);