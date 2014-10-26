'use strict';

angular
.module('krossrApp')
.controller('MainCtrl', function ($rootScope, $scope, $timeout) {
    var _this = this;
            
    $rootScope.shiftOn = false;
    $rootScope.tile = {
        width: 25,
        height: 25
    };

    $rootScope.options = {
        size: 25
    }
      
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
        var flattenedArray = Array.prototype.concat.apply([], $rootScope.gameMatrix);
        return flattenedArray;
    };

    this.setGameSize = function() {
        $rootScope.$broadcast('gameSizeChanged', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    };

    this.createGameArray = function() {
        $rootScope.$broadcast('createNewGame', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    };

    this.clearAll = function() {
        $rootScope.$broadcast('clearAll', { numberOfTiles: parseInt($rootScope.options.size, 10) });
    }

    this.init = function() {
        $timeout(function() {
            _this.createGameArray();
        }, 100);
    };

    $scope.$on('$viewContentLoaded', function() {
        _this.init();
    });
});
