import { SideLengthService } from '../sideLengthService/SideLengthService';
import { TileSizeService } from '../tileSize/TileSizeService';

'use strict';

export class GameSizeService {
    static $name = 'gameSizeService';

    static $inject = [
        '$rootScope',
        '$timeout',
        'sideLengthService',
        'tileSizeService'
    ];

    private gameHeight: string;
    private gameWidth: string;
    private playableAreaSize: number;
    private tutorialDivider: number = 4;

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $timeout: angular.ITimeoutService,
        private sideLengthService: SideLengthService,
        private tileSizeService: TileSizeService
    ) {
        
    }

     /* Take a given game width and subtract border widths. I either have to do this
        or remove border-box and add them instead... doesn't really matter */
    private adjustForBorders(width) {
        var borderWidth = 1;

        /* 18 is a bit of a magic number, I worked backwards from determining how much extra space
            the game had based on sideLength */ 
        return width - ((borderWidth * this.sideLengthService.sideLength) + (18 - this.sideLengthService.sideLength)); 
    }

    
    /** Return the width of the main section of the game so we can calculate game and tile sizes off of it */
    calculatePlayableArea() {
        var pHeight = window.innerHeight,
            pWidth = window.innerWidth;
    
        this.playableAreaSize = Math.min(pHeight, pWidth);
    
        return Math.floor(this.playableAreaSize); 
    }

     /* Return the current game size (width and height in pixels of the game field, changes depending on number of tiles) */
    getGameSize(tutorialMode) {
        // height/width will probably come in as px
        var intHeight = parseInt(this.gameHeight, 10),
            intWidth = parseInt(this.gameWidth, 10);

        return {
            gameHeight: tutorialMode ? intHeight / this.tutorialDivider : this.gameHeight,
            gameWidth: tutorialMode ? intWidth / this.tutorialDivider : this.gameWidth
        };
    }

     /* Modify the current game size. */
    setGameSize(widthInTiles) {
        var finalWidth = Math.floor(this.playableAreaSize / 1.6),
            finalHeight;

        finalWidth = this.adjustForBorders(finalWidth);

        finalHeight = finalWidth;
        this.gameWidth = finalWidth + 'px';
        this.gameHeight = finalHeight + 'px';

        this.$timeout(() => {
            this.$rootScope.$broadcast('gameSizeChanged', { width: this.gameWidth, height: this.gameHeight });
        });
        
        this.tileSizeService.setTileSize(finalWidth, widthInTiles);
    }
}