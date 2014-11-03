'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
    var _this = this;
            
    $rootScope.shiftOn = false;
    $rootScope.tile = {
        width: 25,
        height: 25
    };

    $rootScope.options = {
        size: 25
    };
      
    this.keydown = function(event) {
        console.log("key down! " + event)
        if (event.shiftKey) {
            $rootScope.shiftOn = true;
        }
    };
      
    this.keyup = function(event) {
        if (!event.shiftKey) {
            $rootScope.shiftOn = false;
        }
    };

    this.getSize = function() {
        return _this.flatten($rootScope.gameMatrix);
    };

    this.flatten = function(matrix) {
        return Array.prototype.concat.apply([], matrix);
    };

    this.setGameSize = function() {
        $rootScope.$broadcast('gameSizeChanged', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    };

    this.createGameArray = function(controller) {
        $rootScope.$broadcast('createNewGame', {
            numberOfTiles: parseInt($rootScope.options.size, 10),
            controller: controller
        });
    };

    this.clearAll = function() {
        $rootScope.$broadcast('clearAll', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    }
}]);
