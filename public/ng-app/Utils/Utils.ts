import { BooleanMatrix } from '../../modules/levels/matrix/BooleanMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { SideLengthService } from '../SideLength/SideLengthService';
import { TileService } from '../Tile/TileService';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    static $name = 'Utils';

    constructor(
        private gameSizeService: GameSizeService,
        private sideLengthService: SideLengthService,
        private tileService: TileService
    ) {

    }

    private gameMatrix: BooleanMatrix;
    private goalMatrix: BooleanMatrix;
    
    /** Clear everything, to start a new game */
    clearAll() {
        var currentGameMatrix = this.getGameMatrix();
				
        this.tileService.eraseTiles();

        if (currentGameMatrix) {
            currentGameMatrix.clear();
        }

        this.tileService.clearTileIndex();
    }

    /* Given a number of tiles, create an empty square matrix with that number */
    createEmptyMatrix(numberOfTiles: number) {
        let sideLength = Math.sqrt(numberOfTiles);
        let finalMatrix = new BooleanMatrix(sideLength, sideLength);
        this.setGameMatrix(finalMatrix);
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args) {
        var goalMatrix;

        if (args.layout) {
            this.setGoalMatrix(args.layout);
        }

        this.tileService.clearTileIndex();
        this.gameSizeService.calculatePlayableArea();
        this.createEmptyMatrix(args.numberOfTiles);

        /* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
        then get rid of the goal matrix (since we don't want to be able to win while editing) */
        switch(args.controller) {
            case 'edit':
                goalMatrix = this.getGoalMatrix();

                if (goalMatrix) {
                    this.setGameMatrix(goalMatrix);
                }

                this.setGoalMatrix();
                break;
            case 'new':
                this.setGoalMatrix();
                break;
            default:
                break;
        }
    }
 
    /* Convert a Matrix into an array (for ng-repeat to hit all of them) */
    flatten(matrix) {
        return Array.prototype.concat.apply([], matrix);
    }

    /* Return the current game matrix */
    getGameMatrix(): BooleanMatrix {
        return this.gameMatrix;
    }

    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
    getGoalMatrix() {
        return this.goalMatrix;
    }
			
    /* Display an integer size (e.g. 15) and convert it to a pleasing form (15x15) */
    prettySize(size) {
        return size + 'x' + size;
    }

    /* Modify the current goal matrix (loading level from layout) */
    setGoalMatrix(layout?) {
        if (layout) {
            this.goalMatrix = new BooleanMatrix(layout.length, layout.length);
            this.goalMatrix.initializeWith(layout);
        } else {
            this.goalMatrix = null;
        }
    }

    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
    setGameMatrix(gameMatrix: BooleanMatrix) {
        this.gameMatrix = gameMatrix;
        this.sideLengthService.sideLength = gameMatrix.length;
        this.gameSizeService.setGameSize(gameMatrix.length);
    }
}