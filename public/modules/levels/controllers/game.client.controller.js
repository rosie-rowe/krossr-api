'use strict';

var gameController = function($rootScope, $scope, Convert, tileSize) {
    var _this = this;

    this.setGameSize($rootScope, 25);
    this.clearDragBox();

    this.checkWin = function() {
      _this.checkForWin($rootScope);
    };

    this.convertTo1D = function(index) {
      return Convert.convertTo1D(index, $rootScope.gameMatrix.length);
    }

    this.convertTo2D = function(index) {
      return Convert.convertTo2D(index, $rootScope.gameMatrix.length);
    }

    this.tileIndex = [];

    this.processDragBox = function(dragBox) {
      return _this.handleDragBox($rootScope, dragBox);
    };

    $scope.$on('gameSizeChanged', function(event, args) {
      _this.setGameSize($rootScope, args.numberOfTiles, tileSize);
    });

    $scope.$on('createNewGame', function(event, args) {
      if (args.layout) {
        _this.loadGameFromLayout($rootScope, args.layout);
      } 

      _this.createEmptyMatrix($rootScope, args.numberOfTiles);

      switch (args.controller) {
        case 'edit':
          $rootScope.gameMatrix = $rootScope.goalMatrix;
          delete $rootScope.goalMatrix;
          break;
        case 'new':
          delete $rootScope.goalMatrix;
          break;
        default:
          break;
      }
    });

    $scope.$on('clearAll', function(event, args) {
      var valueRoot = Math.sqrt(args.numberOfTiles);
      $rootScope.gameMatrix = _this.clearAllMatrix($rootScope, $rootScope.gameMatrix, valueRoot)
    });
};

gameController.$inject = ['$rootScope', '$scope', 'Convert', 'tileSize'];

gameController.prototype.checkForWin = function($rootScope) {
  if (typeof $rootScope.goalMatrix !== 'undefined') {
    var result = (angular.equals($rootScope.goalMatrix, $rootScope.gameMatrix));
    if (result) {
      $rootScope.gameIsWon = true;
      $rootScope.$digest();
    }
  }
};

gameController.prototype.findTileCtrlByCoord = function(coord) {
  var index = this.convertTo1D(coord);
  return this.findTileCtrlByIndex(index);
}

gameController.prototype.findTileCtrlByIndex = function(index) {
  return this.tileIndex[index].tileCtrl;
}

gameController.prototype.handleDragBox = function($rootScope, dragBox) {
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

gameController.prototype.setGameSize = function($rootScope, value, tileSize) {
    var valueRoot = Math.sqrt(value),
        finalWidth = tileSize * valueRoot,
        finalHeight = tileSize * valueRoot;

    this.width = finalWidth + 2 + 'px';
    this.height = finalHeight + 'px';
    $rootScope.$broadcast('gameSizeUpdated', { width: this.width });
};

gameController.prototype.createEmptyMatrix = function($rootScope, value) {
  var valueRoot = Math.sqrt(value),
      finalMatrix = [];

  for (var i = 0; i < valueRoot; i++) {
    finalMatrix.push(new Array(valueRoot));
  }

  finalMatrix = this.clearAllMatrix($rootScope, finalMatrix, valueRoot);
  $rootScope.gameMatrix = finalMatrix;
  console.log($rootScope.gameMatrix);
};

gameController.prototype.calculateMargin = function(width) {
  return parseInt(width, 10) / 3;
};

gameController.prototype.loadGameFromLayout = function($rootScope, layout) {
  $rootScope.goalMatrix = layout;
  console.log("Game loaded!");
  console.log(layout);
};

gameController.prototype.clearAllMatrix = function($rootScope, matrix, value) {
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