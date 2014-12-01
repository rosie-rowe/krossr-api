'use strict';

var gameController = function($rootScope, $scope) {
    var _this = this;
    this.setGameSize($rootScope, 25);
    this.clearDragBox();

    this.processDragBox = function(dragBox) {
      return _this.handleDragBox($rootScope, dragBox);
    }

    $scope.$on('gameSizeChanged', function(event, args) {
      _this.setGameSize($rootScope, args.numberOfTiles);
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

gameController.$inject = ['$rootScope', '$scope'];

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

      console.log("dragboxed");

      for (var i = startY; i <= endY; i++) {
        for (var j = startX; j <= endX; j++) {
          var coord = {
            x: j,
            y: i
          };

          finalCoords.push(coord);
        }
      }

    this.clearDragBox();
    return finalCoords;
};

gameController.prototype.clearDragBox = function() {
  this.dragBox = {};
  console.log('dragbox cleared');
};

gameController.prototype.setGameSize = function($rootScope, value) {
    var valueRoot = Math.sqrt(value),
        finalWidth = $rootScope.tile.width * valueRoot,
        finalHeight = $rootScope.tile.height * valueRoot;

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