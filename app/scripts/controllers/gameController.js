'use strict';

var gameController = function($rootScope, $scope) {
    var _this = this;
    this.setGameSize($rootScope, 25);
    $scope.$on('gameSizeChanged', function(event, args) {
      _this.setGameSize($rootScope, args.numberOfTiles);
    });
};

gameController.$inject = ['$rootScope', '$scope'];

gameController.prototype.setGameSize = function($rootScope, value) {
    var valueRoot = Math.sqrt(value),
        finalWidth = $rootScope.tile.width * valueRoot,
        finalHeight = $rootScope.tile.height * valueRoot;

    this.width = finalWidth + 'px';
    this.height = finalHeight + 'px';
}

angular
    .module('krossrApp')
        .controller('gameController', gameController);