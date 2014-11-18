'use strict';

angular.module('levels').directive('tile', [
    function() {
        return {
            controller: 'tileController',
            controllerAs: 'tileCtrl',
            restrict: 'E',
            replace: true,
            require: "^game",
            scope: true,
            templateUrl: 'modules/levels/views/tile.client.view.html',
            link: function(scope, elem, attr, gameCtrl) {          
                scope.tileCtrl.editable = attr.editable;
                scope.index = attr.index;

                elem.on('click', function() {
                    scope.tileCtrl.checkWin();
                });

                elem.on('dragstart', function(e) {
                    e.preventDefault();

                    var coord = scope.tileCtrl.convert2D(scope.index);
                    gameCtrl.dragBox.startCoord = coord;
                });

                elem.on('mouseup', function(e) {
                    e.preventDefault();
                    
                    var coord = scope.tileCtrl.convert2D(scope.index);
                    gameCtrl.dragBox.endCoord = coord;

                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        scope.tileCtrl.fillFromDragBox(gameCtrl.dragBox);
                    }
                });
            }
        }
    }
]);