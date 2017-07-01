/// <reference path="../dragBox/DragBoxService.d.ts" />
/// <reference path="../gameOver/GameOverService.d.ts" />
/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../tile/TileService.d.ts" />
/// <reference path="../../core/event/EventService.d.ts" />

'use strict';

class GameController implements angular.IComponentController {
    static $controllerAs = 'gameCtrl';
    static $name = 'GameController';

    static $inject = [
        '$element',
        '$scope',
        'eventService',
        'gameOverService',
        'Utils',
        'dragBoxService'
    ];

    constructor(
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private eventService: IEventService,
        private gameOverService: IGameOverService,
        private Utils: IUtils,
        private dragBoxService: IDragBoxService,
    ) {

    }

    private gameMatrix: GameMatrix;
    private goalMatrix: GameMatrix;
    private gameSettings;
    private level; // todo
    private margin: number;
    private tiles;

    $onInit() {
        this.dragBoxService.clearDragBox();
    }

    $postLink() {
        this.setMargin(this.Utils.getTileSize(false));
        
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
        
        this.eventService.subscribe(this.$scope, 'gameSizeChanged', () => {
            console.log('gameSizeChanged caught');
            this.updateGameSize();
        });

        this.eventService.subscribe(this.$scope, 'tileSizeChanged', (e, args) => {
            this.setMargin(args);
        });
    }

    /** Change the tiles inside the dragbox to the specified state
        (pending if being dragged over, selected if mouse released normally,
        marked if shift was held) */
    private applyFillDragBox(override?) {
        this.dragBoxService.fill(override);
        this.$scope.$apply();
    };

    private mouseUpEvent(event: JQueryEventObject) {
        this.applyFillDragBox();

        if (this.checkWin()) {
            this.gameOverService.openDialog(this.level);
        }

        this.$scope.$apply();
    }

    /**
    * Compare the current state of the game to the correct state
    */
    checkForWin() {
        return this.gameMatrix.equals(this.goalMatrix);
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

    gameOver() {
        if (!this.level.lost) {
            this.level.won = false;
            this.level.lost = true;
            this.gameOverService.openDialog(this.level);
        }
    };

    setMargin(tileSize: number) {
        this.margin = Math.floor(tileSize) / 2;
    }

    updateGameSize() {
        // don't use args, call to getGameSize so we take tutorials into account
        var newGameSettings = this.Utils.getGameSize(false);

        if (newGameSettings) {
            this.gameSettings = {
                width: newGameSettings.gameWidth,
                height: newGameSettings.gameHeight 
            }
        }
    };
}

angular.module('levels').controller(GameController.$name, GameController);