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
                var pvt = {};

                /* Change the tiles inside the dragbox to the specified state
                    (pending if being dragged over, selected if mouse released normally,
                    marked if shift was held) */
                var fillDragBox = function(override) {
                    gameCtrl.fillDragBox(gameCtrl.dragBox, override);
                    scope.$apply();
                };

                var events = {
                    mouseup: function(e) {
                        fillDragBox();

                        if (gameCtrl.checkWin()) {
                            gameCtrl.openWinLoseNotification();
                        };
                    
                        scope.$apply();
                    }
                };

                elem.on('$destroy', function() {
                    // do something amazing
                });

                /* not sure if this is still necessary, seems to prevent grab hand from appearing even though draggable is no longer applied */
                elem.on('dragstart', function(e) {
                    e.preventDefault();
                });

                elem.on('mouseenter', function() {
                    // focus the game when the mouse enters it
                    // so that the first click will register
                    elem.find('.inner').focus();
                });
                
                // But if the user goes too far away from the game area, clear the dragbox
                // and empty the tiles.
                elem.on('mouseleave', function(e) {
                    e.preventDefault();
                    fillDragBox('empty');
                });

                /* If a user starts dragging a tile and their mouse pointer leaves the game area,
                * the area that was highlighted before should stay highlighted,
                * and should activate when the user lets go of the mouse button.
                * When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
                * This event works with the mouseup event in TileController and 
                * should always run after that event due to bubbling. */
                elem.on('mouseup', events.mouseup);
                elem.on('touchend', function(e) {
                    e.preventDefault();
                    events.mouseup();
                });

                pvt.init = function() {
                    scope.tutorialMode = attr.tutorial;

                    if (scope.tutorialMode) {
                        scope.ctrl.createGameArray('tutorial');
                    }
                };

                pvt.init();
            }
        };
    }
]);