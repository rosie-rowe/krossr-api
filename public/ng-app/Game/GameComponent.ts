import { DragBoxService } from '../DragBox/DragBoxService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameOverService } from '../GameOver/GameOverService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { ILevel } from "../Level/Level";
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileState } from '../Tile/TileState';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { GameSizeEventService } from '../GameSize/GameSizeEventService';
import { TileEventService } from '../Tile/TileEventService';
import { Input, Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'game',
    styles: [require('./GameStyles.less')],
    template: require('./GameView.html')
})
export class GameComponent implements OnInit {
    static $name = 'game';

    constructor(
        private elementRef: ElementRef,
        private gameOverService: GameOverService,
        private gameSizeEventService: GameSizeEventService,
        private gameSizeService: GameSizeService,
        private tileEventService: TileEventService,
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService,
        private dragBoxService: DragBoxService,
    ) {
        this.$element = this.elementRef.nativeElement;
    }

    @Input() public gameMatrix: GameMatrix;
    @Input() public goalMatrix: GameMatrix;
    @Input() public level: ILevel;
    @Input() public tiles;

    private $element: HTMLElement;
    private gameSettings;
    private margin: string;

    ngOnInit() {
        this.dragBoxService.clearDragBox();

        this.setMargin(this.tileSizeService.getTileSize());
        
        /* not sure if this is still necessary, seems to prevent grab hand from appearing even though draggable is no longer applied */
        this.$element.addEventListener('dragstart', (e) => e.preventDefault())

        // focus the game when the mouse enters it so that the first click will register
        this.$element.addEventListener('mouseenter', () => {
            let elements = this.$element.querySelectorAll('.inner') as NodeListOf<HTMLElement>;

            elements.forEach(ele => ele.focus());
        })

        // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
        this.$element.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            this.applyFillDragBox(TileState.empty);
        });

        this.gameSizeEventService.gameSizeChanged.subscribe(() => {
            this.updateGameSize();
        });

        this.tileEventService.tileDragEnd.subscribe(() => {
            this.mouseUpEvent();
        })

        this.tileSizeEventService.tileSizeChanged.subscribe((tileSize) => {
            this.setMargin(tileSize);
        });
    }

    /** Change the tiles inside the dragbox to the specified state
        (pending if being dragged over, selected if mouse released normally,
        marked if shift was held) */
    private applyFillDragBox(override?) {
        this.dragBoxService.fill(override);
    };

    /**
     * If a user starts dragging a tile and their mouse pointer leaves the game area,
     * the area that was highlighted before should stay highlighted,
     * and should activate when the user lets go of the mouse button.
     * When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
     * This event works with the mouseup event in TileController and 
     * should always run after that event.
     */
    private mouseUpEvent() {
        this.applyFillDragBox();

        if (this.checkWin()) {
            this.gameOverService.openDialog(this.level);
        }
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
            return true;
        }
        
        return false;
    };

    setMargin(tileSize: number) {
        this.margin = Math.floor(tileSize) / 2 + 'px';
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