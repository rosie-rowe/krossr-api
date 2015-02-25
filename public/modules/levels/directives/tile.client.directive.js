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

                var clearPending = function(coords) {                 
                    angular.forEach(coords, function(value, key) {
                        var theTileController = gameCtrl.findTileCtrlByCoord(value);
                        if (theTileController.pending && !theTileController.selected) {
                            theTileController.change(value, true, 'empty');
                        }
                    });
                };

                var fillPending = function(index) {
                    var coord = scope.tileCtrl.convert2D(index),
                        coordsToClear;

                    // save a snapshot of the previous dragbox for comparison purposes
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var oldCoords = gameCtrl.processDragBox(gameCtrl.dragBox);
                    }

                    // set the current coordinate to the new dragbox end and compute the new dragbox
                    gameCtrl.dragBox.endCoord = coord;
                    
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var allPendingCoords = gameCtrl.processDragBox(gameCtrl.dragBox);
                    }

                    // we should only clear the old coordinates off if the current selected area is
                    // smaller than the previous selected area, for speed reasons
                    if (allPendingCoords &&
                        oldCoords &&
                        allPendingCoords.length < oldCoords.length) {

                        // more speed -- only clear the values that are present in
                        // oldCoords but not allPendingCoords
                        coordsToClear = oldCoords.filter(function(e) {
                            if (allPendingCoords.indexOfObject(e) === -1) return true;
                        });
                        clearPending(coordsToClear);
                    }

                    angular.forEach(allPendingCoords, function(value, key) {
                        var theTileController = gameCtrl.findTileCtrlByCoord(value);
                        // should also only change it to pending if it's not already, also for speed reasons
                        if (!theTileController.pending) {
                            theTileController.change(value, true, 'pending');
                        }
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
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord) {
                        fillPending(scope.index);
                    }
                });

                elem.on('mouseup', function(e) {
                    e.preventDefault();
                    
                    var coord = gameCtrl.convertTo2D(scope.index);
                    gameCtrl.dragBox.endCoord = coord;

                    if (!(gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord)) {
                        scope.tileCtrl.change(coord);
                    }
                });
            }
        }
    }
]);