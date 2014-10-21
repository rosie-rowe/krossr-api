'use strict';

var tileController = function($rootScope) {
    var _this = this;
    this.change = function() {
        _this.changeTile($rootScope);
    };
    this.setTileSize($rootScope, 25);
};

tileController.$inject = ['$rootScope'];

tileController.prototype.changeTile = function($rootScope) {
    if ($rootScope.shiftOn === true) {
      this.marked = true;
      this.selected = false;
    } else {
      this.selected = true;
      this.marked = false;
    }
};

tileController.prototype.setTileSize = function($rootScope, value) {
    $rootScope.tile.width  = value;
    $rootScope.tile.height = value;
    
    this.width = $rootScope.tile.width + 'px';
    this.height = $rootScope.tile.height  + 'px';
}

angular
    .module('krossrApp')
        .controller('tileController', tileController);