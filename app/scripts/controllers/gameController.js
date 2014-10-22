'use strict';

var gameController = function($rootScope, $scope) {
    var _this = this;
    this.setGameSize($rootScope, 25);

    $scope.$on('gameSizeChanged', function(event, args) {
      _this.setGameSize($rootScope, args.numberOfTiles);
    });

    $scope.$on('createNewGame', function(event, args) {
      _this.createEmptyMatrix($rootScope, args.numberOfTiles);
    });

    $scope.$on('clearAll', function(event, args) {
      var valueRoot = Math.sqrt(args.numberOfTiles);
      $rootScope.gameMatrix = _this.clearAllMatrix($rootScope, $rootScope.gameMatrix, valueRoot)
    });
};

gameController.$inject = ['$rootScope', '$scope'];

gameController.prototype.setGameSize = function($rootScope, value) {
    var valueRoot = Math.sqrt(value),
        finalWidth = $rootScope.tile.width * valueRoot,
        finalHeight = $rootScope.tile.height * valueRoot;

    this.width = finalWidth + 'px';
    this.height = finalHeight + 'px';
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
    .module('krossrApp')
        .controller('gameController', gameController);