/// <reference path="./Utils.d.ts" />

class Utils implements IUtils {
    static $inject = [
        '$timeout',
        '$rootScope',
        'ngDialog'
    ];

    constructor(
        private $timeout: angular.ITimeoutService,
        private $rootScope: angular.IRootScopeService,
        private ngDialog: any
    ) {

    }

    private gameMatrix: boolean[][];
    private gameHeight: string;
    private gameWidth: string;
    private goalMatrix: boolean[][];
    private outerGameSize: number;
    private playableAreaSize: number;
    private sideLength: number;
    private tileIndex: any[] = [];
    private tileSize: number = 25;
    private timeout: number = 1000;
    private tutorialDivider: number = 4;

    /** Append the current tile index */
    addTileToIndex(obj) {
        this.tileIndex.push(obj);
    }
 
    /* Take a given game width and subtract border widths. I either have to do this
        or remove border-box and add them instead... doesn't really matter */
    adjustForBorders(width) {
        var borderWidth = 1;

        /* 18 is a bit of a magic number, I worked backwards from determining how much extra space
            the game had based on sideLength */ 
        return width - ((borderWidth * this.sideLength) + (18 - this.sideLength)); 
    }

    /** Return the width of the main section of the game so we can calculate game and tile sizes off of it */
    calculatePlayableArea() {
        var pHeight = window.innerHeight,
            pWidth = window.innerWidth;
    
        this.playableAreaSize = Math.min(pHeight, pWidth);
    
        return Math.floor(this.playableAreaSize); 
    }

    /** Clear everything, to start a new game */
    clearAll() {
        var currentGameMatrix = this.getGameMatrix();
				
        this.clearAllTiles();

        if (currentGameMatrix) {
            this.clearAllMatrix(currentGameMatrix, currentGameMatrix.length);
        }

        this.clearTileIndex();
    }

    /** Given a matrix of true/false values, set every value to false */
    clearAllMatrix(matrix, value) {
        var len;

        for (var i = 0; i < value; i++) {
            len = matrix[i].length
            for (var j = 0; j < len; j++) {
                matrix[i][j] = false;
            }
        }

        return matrix;
    }

   
    clearAllTiles() {
        var i = 0,
            len = this.tileIndex.length;

        for (; i < len; i++) {
            this.tileIndex[i].tileCtrl.fill('empty');
        }
    }

    // make sure the index is clean before we add to it to avoid bugs with switching between screens
    clearTileIndex() {
        this.tileIndex = [];
    }

    /* Convert a 2D coordinate into an index */
    convertTo1D(coord) {
        return (coord.y * this.sideLength) + coord.x;
    }

    /* Convert an index into a 2D coordinate */
    convertTo2D(index) {
        var x = index % this.sideLength,
            y = (index - x) / this.sideLength,
            coord = {
                y: y,
                x: x
            };

        return coord;
    }

    /* Given a number of tiles, create an empty square matrix with that number */
    createEmptyMatrix(value) {
        var valueRoot = Math.sqrt(value),
            finalMatrix = [];

        for (var i = 0; i < valueRoot; i++) {
            finalMatrix.push(new Array(valueRoot));
        }

        finalMatrix = this.clearAllMatrix(finalMatrix, valueRoot);
        this.setGameMatrix(finalMatrix);
    }

    /* Combine a lot of the other functions here to set up a new game */
    createNewGame(args) {
        var goalMatrix;

        if (args.layout) {
            this.setGoalMatrix(args.layout);
        }

        this.clearTileIndex();
        this.calculatePlayableArea();
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
 
    /* Given an index and orientation, pass a message to the tile controller
     * to mark out the tiles on that line that aren't selected */
    finishLine(index, orientation) {
        this.$rootScope.$broadcast('lineComplete', { index: index, orientation: orientation });
    }

    /* Convert a Matrix into an array (for ng-repeat to hit all of them) */
    flatten(matrix) {
        return Array.prototype.concat.apply([], matrix);
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

    /* Return the current game matrix */
    getGameMatrix() {
        return this.gameMatrix;
    }

    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
    getGoalMatrix() {
        return this.goalMatrix;
    }
			
    /* Return the current side length */
    getSideLength() {
        return this.sideLength;
    }

    /* Return the current tile index */
    getTileIndex() {
        return this.tileIndex;
    }

    getTileSize(tutorialMode) {
        return tutorialMode ? this.tileSize / this.tutorialDivider : this.tileSize;
    }

    getTileSizePx() {
        return this.getTileSize(false)  + 'px'
    }

    getWidth(selector) {
        return angular.element(selector).outerWidth();
    }

    /* Display an integer size (e.g. 15) and convert it to a pleasing form (15x15) */
    prettySize(size) {
        return size + 'x' + size;
    }

    /* Modfiy a specific coordinate of the game matrix (used for selection of tiles) */
    setCoord(y, x, value) {
        this.gameMatrix[y][x] = value;
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
        
        this.setTileSize(finalWidth, widthInTiles);
    }

    /* Modify the current goal matrix (loading level from layout) */
    setGoalMatrix(layout?) {
        this.goalMatrix = layout;
    }

    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
    setGameMatrix(matrix) {
        this.gameMatrix = matrix;
        this.setSideLength(matrix.length);
        this.setGameSize(matrix.length);
    }

    /* Modify the current side length */
    setSideLength(length) {
        this.sideLength = length;
    }

    setTileSize(gameWidth, widthInTiles) {
        this.tileSize = gameWidth / parseInt(widthInTiles, 10);
        this.$rootScope.$broadcast('tileSizeChanged', this.tileSize);
    }

    /* Make div.gameContainer-inner be only as large as it needs to be,
    *  so the game will be centered in its available space. */
    setOuterGameWidth(width) {
        this.$timeout(() => {
            this.setWidth('.gameContainer-inner', this.gameWidth);
        }, 0);
    }

    setWidth(selector, width) {
        angular.element(selector).css("width", width);
    }

    // this is here so it can be shared between game.client.controller and levels.client.controller
    updateLevel(level, scope) {
        level.size = level.layout.length;

        level.$update(function() {
            
        }, function(errorResponse) {
            scope.error = errorResponse.data.message;

            this.$timeout(() => {
                scope.error = null;
            }, this.timeout);
        });
    }
}

angular.module('levels').service('Utils', Utils);