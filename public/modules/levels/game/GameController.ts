/// <reference path="../utils/Utils.d.ts" />

'use strict';

class GameController implements angular.IComponentController {
    static $controllerAs = 'gameCtrl';
    static $name = 'GameController';

    static $inject = [
        '$attrs',
        '$element',
        '$scope',
        '$timeout',
        'Utils',
        'ngDialog',
        'dragBoxService'
    ];

    constructor(
        private $attrs: angular.IAttributes,
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService,
        private Utils: IUtils,
        private ngDialog,
        private dragBoxService
    ) {

    }

    private ctrl; // MainController, todo
    private gameSettings;
    private level;
    private tiles;
    private tutorial;

    $onInit() {
        this.dragBoxService.clearDragBox();

        this.tutorial = this.$attrs['tutorial'];

        if (this.tutorial) {
            this.ctrl.createGameArray('tutorial');
        }
    }

    $postLink() {
        /* not sure if this is still necessary, seems to prevent grab hand from appearing even though draggable is no longer applied */
        this.$element.on('dragstart', (e) => e.preventDefault())

        // focus the game when the mouse enters it so that the first click will register
        this.$element.on('mouseenter', () => {
            this.$element.find('.inner').focus();
        })

        // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
        this.$element.on('mouseleave', (e) => {
            e.preventDefault();
            this.applyFillDragBox('empty');
        });

        /**
         * If a user starts dragging a tile and their mouse pointer leaves the game area,
         * the area that was highlighted before should stay highlighted,
         * and should activate when the user lets go of the mouse button.
         * When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
         * This event works with the mouseup event in TileController and 
         * should always run after that event due to bubbling.
         */
        this.$element.on('mouseup', (e) => this.mouseUpEvent(e));
        this.$element.on('touchend', (e) => {
            e.preventDefault();
            this.mouseUpEvent(e);
        });
        
        this.$scope.$on('gameSizeChanged', () => {
            this.updateGameSize();
        });
    }


    /** Change the tiles inside the dragbox to the specified state
        (pending if being dragged over, selected if mouse released normally,
        marked if shift was held) */
    private applyFillDragBox(override?) {
        this.fillDragBox(override);
        this.$scope.$apply();
    };

    private mouseUpEvent(event: JQueryEventObject) {
        this.applyFillDragBox();

        if (this.checkWin()) {
            this.openWinLoseNotification();
        }

        this.$scope.$apply();
    }

    /**
    * Compare the current state of the game to the correct state
    */
    checkForWin() {
        var goalMatrix = this.Utils.getGoalMatrix();
        var gameMatrix = this.Utils.getGameMatrix();
    
        if (typeof goalMatrix !== 'undefined') {
            var result = (angular.equals(goalMatrix, gameMatrix));
    
            if (result) {
                return true;
            }
        }
        return false;
    };

    checkWin() {
        var winner = this.checkForWin();

        if (winner && !this.level.lost) {
            this.level.won = true;
            this.$scope.$digest();
            return true;
        }
        return false;
    };

    fillDragBox(override) {
        if (this.dragBoxService.validate()) {
            this.fillTiles(this.dragBoxService.process(), this.dragBoxService.initState, override);
            this.dragBoxService.clearDragBox();
        }
    };
    
    /**
    * Fill all of the tiles in the specified coordinate array
    * @params {Array} array of coordinate objects
    * @params {function} a function to run on each tile controller before changing it to determine whether or not to change. must be defined in tile.client.controller.js
    */
    fillTiles(coords, initState, override, validationFn?) {
        var len = coords.length;
        var i = 0;
        var currentCoord;
        var currentTileController;
    
        for (; i < len; i++) {
            currentCoord = coords[i];
            currentTileController = this.findTileCtrlByCoord(currentCoord);
    
            if (!validationFn || (typeof currentTileController[validationFn] === 'function' && currentTileController[validationFn]())) {
                currentTileController.change(currentCoord, initState, override);
            }
        }
    }

      /* Grab a tile controller out of the tile index from a given 2D coordinate */
    findTileCtrlByCoord(coord) {
        var index = this.Utils.convertTo1D(coord);
        return this.findTileCtrlByIndex(index);
    }

    /* Grab a tile controller out of the tile index from a given 1D index */
    findTileCtrlByIndex(index) {
        var tileIndex = this.Utils.getTileIndex();
        return tileIndex[index].tileCtrl;
    };

    gameOver() {
        if (!this.level.lost) {
            this.level.won = false;
            this.level.lost = true;
            this.openWinLoseNotification();
        }
    };

    openWinLoseNotification() {
        this.ngDialog.open({
            plain: true,
            template: '<game-over close-action="closeThisDialog()"></game-over>',
            scope: this.$scope,
            showClose: false
        });
    };

    updateGameSize() {
        // don't use args, call to getGameSize so we take tutorials into account
        var newGameSettings = this.Utils.getGameSize(this.$scope.tutorialMode);

        if (newGameSettings) {
            this.gameSettings = {
                width: newGameSettings.gameWidth,
                height: newGameSettings.gameHeight 
            }
        }
    };
}

angular.module('levels').controller(GameController.$name, GameController);