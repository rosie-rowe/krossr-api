'use strict';

angular.module('levels').directive('tile', ['Utils', 'touchService',
    function(Utils, touchService) {
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

                var pvt = {};

                pvt.init = function() {
                    scope.tileCtrl.setTileSize(scope.tileCtrl.getTileSize(attr.tutorial));
                    Utils.addTileToIndex({ tileCtrl: scope.tileCtrl });
                }

                var clearPending = function(coords) {
                    var i = 0,
                        len = coords.length,
                        currentCoord,
                        currentTileController;

                    for (; i < len; i++) {
                        currentCoord = coords[i];
                        currentTileController = gameCtrl.findTileCtrlByCoord(currentCoord);
                        if (currentTileController.pending && !currentTileController.selected) {
                            currentTileController.change(currentCoord, true, 'empty');
                        }
                    }           
                };

                var fillPending = function(index) {
                    var coord = scope.tileCtrl.convert2D(index),
                        coordsToClear,
                        i = 0,
                        len,
                        currentCoord,
                        currentTileController;

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

                    len = allPendingCoords.length;

                    for (; i < len; i++) {
                        currentCoord = allPendingCoords[i];
                        currentTileController = gameCtrl.findTileCtrlByCoord(currentCoord);
                        if (!currentTileController.pending) {
                            currentTileController.change(currentCoord, true, 'pending');
                        }
                    }

                    scope.$apply();
                };

                elem.on(touchService.getEvent('mousedown'), function(e) {
                    e.preventDefault();

                    var coord = scope.tileCtrl.convert2D(scope.index);
                    gameCtrl.dragBox.startCoord = coord;

                    // Based on the state of the tile where we begin dragging, we will make all tiles in the dragbox the opposite of that state.
                    gameCtrl.dragBox.initState = scope.tileCtrl.selected;
                });

                elem.on(touchService.getEvent('mousemove'), function(e) {
                    e.preventDefault();

                    var actualScope = touchService.getTargetScope(e);

                    if (actualScope && actualScope.index) {
                        if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord)  {
                            fillPending(actualScope.index);
                        }
                    }
                });

                elem.on(touchService.getEvent('mouseup'), function(e) {
                    e.preventDefault();

                    var actualScope = touchService.getTargetScope(e);
                    var coord;
                    
                    if (actualScope && actualScope.index) {
                        coord = gameCtrl.convertTo2D(actualScope.index);
                        gameCtrl.dragBox.endCoord = coord;

                        if (!(gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord)) {
                            scope.tileCtrl.change(coord);
                        }
                    }
                });

                pvt.init();

                // this is necessary to prevent tiles from previous ng-repeat from displaying when switching levels
                scope.$on('$destroy', function() {
                    elem.remove(); 
                });

                /* Remove a life from the pool of remaining lives */
                scope.removeLife = function() {
                    var level = scope.level;

                    if (level && level.currentLives) {
                        level.currentLives--;

                        if (level.currentLives === 0) {
                            gameCtrl.gameOver();
                        }
                    }
                };
            }
        }
    }
]);