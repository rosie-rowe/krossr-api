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
                    return findTileCtrlByIndex(index);
                };

                var findTileCtrlByIndex = function(index) {
                    return angular.element('.tile[data-index=' + index + ']').scope().tileCtrl;
                }

                var clearPending = function() {
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var allCoords = gameCtrl.processDragBox(gameCtrl.dragBox);

                        angular.forEach(allCoords, function(value, key) {
                            var theTileController = findTileCtrlByCoord(value);
                            if (theTileController.pending) {
                                theTileController.change(value, true, 'empty');
                            }
                        });
                    }
                };

                var fillPending = function(index) {
                    var coord = scope.tileCtrl.convert2D(index);

                    gameCtrl.dragBox.endCoord = coord;
                    
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var allPendingCoords = gameCtrl.processDragBox(gameCtrl.dragBox);
                    }

                    angular.forEach(allPendingCoords, function(value, key) {
                        var theTileController = findTileCtrlByCoord(value);
                        theTileController.change(value, true, 'pending');
                    });
                };

                elem.on('dragstart', function(e) {
                    e.preventDefault();

                    var coord = scope.tileCtrl.convert2D(scope.index);
                    gameCtrl.dragBox.startCoord = coord;

                    // Based on the state of the tile where we begin dragging, we will make all tiles in the dragbox the opposite of that state.
                    gameCtrl.dragBox.initState = scope.tileCtrl.selected;
                });

                elem.on('mouseenter', function(e) {
                    fillPending(scope.index);
                });

                elem.on('mouseleave', function() {
                    clearPending();
                });

                elem.on('mouseup', function(e) {
                    e.preventDefault();
                    
                    var coord = scope.tileCtrl.convert2D(scope.index);
                    gameCtrl.dragBox.endCoord = coord;

                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var initState = gameCtrl.dragBox.initState,
                            coords = gameCtrl.processDragBox(gameCtrl.dragBox);

                        angular.forEach(coords, function(value, key) {
                            var theTileController = findTileCtrlByCoord(value);
                            theTileController.change(value, initState);
                        });

                        gameCtrl.clearDragBox();
                    } else {
                        scope.tileCtrl.change(coord);
                    }

                    scope.tileCtrl.checkWin();
                });
            }
        }
    }
]);