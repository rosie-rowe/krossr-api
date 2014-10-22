'use strict';

var tileController = function($rootScope) {
    var _this = this;

    this.selected = false;
    this.marked = false;

    this.change = function(index) {
        _this.changeTile($rootScope, index);
    };
    this.setTileSize($rootScope, 25);
};

tileController.$inject = ['$rootScope'];

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
      y = index % valueRoot,
      x = (index - y) / valueRoot,
      coord = [];

  coord.push(x, y);

  return coord;
}

angular
    .module('krossrApp')
        .controller('tileController', tileController);