'use strict';

angular.module('levels').directive('game', [
    function() {
        return {
            controller: 'gameController',
            controllerAs: 'gameCtrl',
            restrict: 'E',
            replace: true,
            scope: true,
            transclude: true,
            templateUrl: 'modules/levels/views/game.client.view.html',
            link: function (scope, elem, attr, gameCtrl) {
                var fillDragBox = function(override) {
                    if (gameCtrl.dragBox && gameCtrl.dragBox.startCoord && gameCtrl.dragBox.endCoord) {
                        var initState = gameCtrl.dragBox.initState,
                            coords = gameCtrl.processDragBox(gameCtrl.dragBox);

                        angular.forEach(coords, function(value, key) {
                            var theTileController = gameCtrl.findTileCtrlByCoord(value);
                            theTileController.change(value, initState, override);
                        });

                        gameCtrl.clearDragBox();
                    }  
                };

                elem.on('mouseenter', function() {
                    // focus the game when the mouse enters it
                    // so that the first click will register
                    elem.find('.inner').focus();
                    //console.log('focused');

                    if (gameCtrl.getTileIndex().length === 0) {
                        gameCtrl.indexTiles();
                    }
                });
                
                // But if the user goes too far away from the game area, clear the dragbox
                // and empty the tiles.
                elem.on('mouseleave', function(e) {
                    e.preventDefault();
                    fillDragBox('empty');
                });

                // If a user starts dragging a tile and their mouse pointer leaves the game area,
                // the area that was highlighted before should stay highlighted,
                // and should activate when the user lets go of the mouse button.
                // When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
                // This event works with the mouseup event in TileController and 
                // should always run after that event due to bubbling.
                elem.on('mouseup', function(e) {
                    e.preventDefault();
                    fillDragBox();
                    if(gameCtrl.checkWin()) {
                        gameCtrl.setWinTime(scope.level.timeLimit - scope.level.timeRemaining);
                    };
                });

                // This also works with the click event in main.controller and should always hit this one first due to bubbling
                elem.on('click', '.win-notification .play-again', function() {
                    gameCtrl.gameIsWon = false;
                    gameCtrl.gameIsLost = false;
                    gameCtrl.gameIsOver = false;

                    // reset the time back to its original value, this might be slightly hacky but I don't want to modify angular-timer at the moment
                    gameCtrl.addTime(scope.level.timeLimit - scope.level.timeRemaining);
                    gameCtrl.startTimer();

                    scope.$digest();
                });
            }
        };
    }
]);