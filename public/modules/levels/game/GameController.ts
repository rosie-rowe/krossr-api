import { DragBoxService } from '../dragBox/DragBoxService';
import { EventService } from '../../core/eventService/EventService';
import { GameMatrix } from '../gameMatrix/GameMatrix';
import { GameOverService } from '../gameOver/GameOverService';
import { GameSizeService } from '../gameSize/GameSizeService';
import { ILevel } from "../level/Level";
import { TileSizeService } from '../tileSize/TileSizeService';
import { TileState } from '../tile/TileState';

'use strict';

export class GameController implements angular.IComponentController {
    static $controllerAs = 'gameCtrl';
    static $name = 'GameController';

    static $inject = [
        '$element',
        '$scope',
        'eventService',
        'gameOverService',
        'gameSizeService',
        'tileSizeService',
        'dragBoxService'
    ];

    constructor(
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private eventService: EventService,
        private gameOverService: GameOverService,
        private gameSizeService: GameSizeService,
        private tileSizeService: TileSizeService,
        private dragBoxService: DragBoxService,
    ) {

    }

    private gameMatrix: GameMatrix;
    private goalMatrix: GameMatrix;
    private gameSettings;
    private level: ILevel;
    private margin: number;
    private tiles;

    $onInit() {
        this.dragBoxService.clearDragBox();
    }

    $postLink() {
        this.setMargin(this.tileSizeService.getTileSize());
        
        /* not sure if this is still necessary, seems to prevent grab hand from appearing even though draggable is no longer applied */
        this.$element.on('dragstart', (e) => e.preventDefault())

        // focus the game when the mouse enters it so that the first click will register
        this.$element.on('mouseenter', () => {
            this.$element.find('.inner').focus();
        })

        // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
        this.$element.on('mouseleave', (e) => {
            e.preventDefault();
            this.applyFillDragBox(TileState.empty);
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
        if (this.goalMatrix) {
            return this.gameMatrix.equals(this.goalMatrix);
        } else {
            return false;
        }
    };

    checkWin() {
        var winner = this.checkForWin();

        if (winner) {
            this.level.won = true;
            this.$scope.$digest();
            return true;
        }
        
        return false;
    };

    setMargin(tileSize: number) {
        this.margin = Math.floor(tileSize) / 2;
    }

    updateGameSize() {
        // don't use args, call to getGameSize so we take tutorials into account
        var newGameSettings = this.gameSizeService.getGameSize(false);

        if (newGameSettings) {
            this.gameSettings = {
                width: newGameSettings.gameWidth,
                height: newGameSettings.gameHeight 
            }
        }
    };
}