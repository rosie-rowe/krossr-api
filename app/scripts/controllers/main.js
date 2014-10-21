'use strict';

angular
.module('krossrApp')
.controller('MainCtrl', function ($rootScope, $scope) {
    var _this = this;
            
    $rootScope.shiftOn = false;
    $rootScope.tile = {
        width: 25,
        height: 25
    };
      
    this.keydown = function(event) {
        if (event.shiftKey) {
            $rootScope.shiftOn = true;
        }
    };
      
    this.keyup = function(event) {
        if (!event.shiftKey) {
            $rootScope.shiftOn = false;
        }
    };

    this.getSize = function(number) {
        var size = parseInt(number, 10),
            sizeArray = new Array(size);

        return sizeArray;
    };

    this.setGameSize = function() {
        $rootScope.$broadcast('gameSizeChanged', { numberOfTiles: parseInt(this.options.size, 10) });
    };
});
