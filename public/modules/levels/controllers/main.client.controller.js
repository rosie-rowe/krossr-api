'use strict';

angular
.module('levels')
.controller('MainCtrl', ['$scope', '$timeout', 'shiftService', 'Utils',
    function ($scope, $timeout, shiftService, Utils) {
    var _this = this;
            
    this.currentView = 'view';
    this.tileSize = Utils.getTileSizePx();
    this.finalLayout = {};
    this.flatten = Utils.flatten;

    this.getSize = function() {
        return _this.flatten(Utils.getGameMatrix());
    };

    $scope.$on('tileSizeChanged', function(e, args) {
        var newSize = Math.floor(args);
        _this.tileSize = newSize  + 'px';
        _this.margin = newSize / 2;
    });


    this.options = {
        size: 25
    };
      
    this.keydown = function(event) {
        //debugger;
        console.log("key down!");
        if (event.shiftKey) {
            shiftService.shiftOn = true;
        }
    };
      
    this.keyup = function(event) {
        console.log("key up!");
        if (!event.shiftKey) {
            shiftService.shiftOn = false;
        }
    };

    this.getLines = function(layout) {
        if (layout) {
            return layout;
        }
    };

    this.getLayoutForRepeater = function(mode, layout) {
        // use finalLayout from above to prevent calculating this more than once
        var layoutForRepeater;

        switch (mode) {
            case 'view':
            case 'edit':
                layoutForRepeater = $scope.ctrl.flatten(layout);
                break;

            case 'new':
                layoutForRepeater =  $scope.ctrl.getSize();
                break;
        }

        console.log('HOW MANY TIMES DOES THIS RUN???');

        // these should be an object so i don't have to track by $index, which causes rendering issues
        _this.finalLayout.tiles = layoutForRepeater.map(function(value) {
            return {
                selected: value
            };
        });
    };

    this.setGameSize = function(size) {
        Utils.setGameSize(Math.sqrt(size));
    };

    this.createGameArray = function(controller) {
        Utils.createNewGame({
            numberOfTiles: parseInt(_this.options.size, 10),
            controller: controller
        });
    };

    this.initTutorialGame = function() {
        console.log('hi');
    };

    this.toggleShowLevels = function() {
        $scope.showLevels = !$scope.showLevels;
    };

    this.clearAll = Utils.clearAll.bind(Utils);

    this.getFontSize = function() {
        return parseInt(_this.tileSize, 10) / 2 + 'px';
    };
}]);
