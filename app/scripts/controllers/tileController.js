'use strict';

var tileController = function($rootScope, $scope) {
    var _this = this;

    this.selected = false;
    this.marked = false;

    this.change = function(index) {
        _this.changeTile($rootScope, index);
    };
    this.setTileSize($rootScope, 25);
    $scope.$on('clearAll', function() {
      _this.selected = false;
      _this.marked = false;
    });
};

tileController.$inject = ['$rootScope', '$scope'];

tileController.prototype.changeTile = function($rootScope, index) {
    var coord = this.convertTo2D($rootScope, index);

    if ($rootScope.shiftOn === true) {
      this.marked = !this.marked;
      this.selected = false;
    } else {
      this.selected = !this.selected;
      this.marked = false;
      $rootScope.gameMatrix[coord[0]][coord[1]] = this.selected;
    }
};

tileController.prototype.setTileSize = function($rootScope, value) {
    $rootScope.tile.width  = value;
    $rootScope.tile.height = value;

    this.width = $rootScope.tile.width + 'px';
    this.height = $rootScope.tile.height  + 'px';
};

tileController.prototype.convertTo2D = function($rootScope, index) {
  var valueRoot = Math.sqrt($rootScope.options.size),
      x = index % valueRoot,
      y = (index - x) / valueRoot,
      coord = [];

  coord.push(y, x);
  console.log(coord);
  return coord;
}

angular
    .module('krossrApp')
        .controller('tileController', tileController);