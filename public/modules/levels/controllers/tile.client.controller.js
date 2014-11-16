'use strict';

var tileController = function($rootScope, $scope) {
    var _this = this;

    this.fill('empty');

    this.change = function(index) {
        if (this.editable === 'true') {
          _this.changeTile($rootScope, index);
        }
    };
    this.getLayoutForEdit = function(layout, index) {
        _this.fillFromLayout($rootScope, layout, index);
    };
    this.checkWin = function() {
      _this.checkForWin($rootScope);
    }
    this.setTileSize($rootScope, 25);
    $scope.$on('clearAll', function() {
      console.log('clearing tile');
      _this.fill('empty');
    });
};

tileController.$inject = ['$rootScope', '$scope'];

tileController.prototype.changeTile = function($rootScope, index) {
    var coord = this.convertTo2D($rootScope, index);

    console.log(coord);

    if ($rootScope.shiftOn === true) {
      this.fill('marked');
    } else {
      this.fill('selected');
      $rootScope.gameMatrix[coord.y][coord.x] = this.selected;
    }
};

tileController.prototype.checkForWin = function($rootScope) {
  if (typeof $rootScope.goalMatrix !== 'undefined') {
    var result = ($rootScope.goalMatrix.toString() === $rootScope.gameMatrix.toString());
    console.log(result);
  }
};

tileController.prototype.fill = function(fillType) {
  switch (fillType) {
    case 'marked':
      this.marked = !this.marked;
      this.selected = false;
      break;
    case 'selected':
      this.selected = !this.selected;
      this.marked = false;
      break;
    case 'empty':
      this.selected = false;
      this.marked = false;
      break;
    default:
      console.log("you done goofed");
      break;
  }
};

tileController.prototype.fillFromLayout = function($rootScope, layout, index) {
  var coord = this.convertTo2D($rootScope, index),
      value = layout[coord.y][coord.x];

  if (value === true) {
    this.fill('selected');
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
      coord = {
        y: y,
        x: x
      };

  //console.log(coord);
  return coord;
}

angular
    .module('levels')
        .controller('tileController', tileController);