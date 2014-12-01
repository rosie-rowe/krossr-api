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

                /* Hacky */
                var findTileCtrlByCoord = function(coord) {
                    var index = scope.tileCtrl.convert1D(coord);
                    return angular.element('.tile[data-index=' + index + ']').scope().tileCtrl;
                };

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
                        var coords = gameCtrl.processDragBox(gameCtrl.dragBox);
                        angular.forEach(coords, function(value, key) {
                            var theTileController = findTileCtrlByCoord(value);
                            theTileController.change(value);
                        });
                    } else {
                        scope.tileCtrl.change(coord);
                    }

                    scope.tileCtrl.checkWin();
                });
            }
        }
    }
]);