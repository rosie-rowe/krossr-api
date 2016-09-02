/// <reference path="../typings/point.d.ts" />

'use strict';

class NumberLineController {
    constructor(private $scope, private $timeout, private Utils) {
        this.$scope.cssClass = '';
        this.$scope.controllerName = 'numberLine';

        this.$scope.getLineContent = this.getLineContent.bind(this);
        this.$scope.getHeight = this.getHeight.bind(this);
        this.$scope.getWidth = this.getWidth.bind(this);
    }

    private gameMatrix: GameMatrix = new GameMatrix();
    private goalMatrix: boolean[][] = this.$scope.layout || this.Utils.getGoalMatrix();

    private sideLength: number = this.goalMatrix.length;
    private lineContent: LineContent[] = [];
    private currentGroup: TileGroup = new TileGroup();
    private hasGroup: boolean = false;
    private targetMatrix: GameMatrix = new GameMatrix();

    // display a crossed out 0 if the linecontent comes back with no content. otherwise, pass through
    private accountForZeros(lineContent: LineContent[]): LineContent[] {
        if (lineContent.length === 0) {
            return [{
                cssClass: 'finishedGrouping',
                text: 0
            }];
        } else {
            return lineContent;
        }
    }

    /* When computing number lines for the top part, we need to reverse the results
        before joining them for display, so they will appear in the correct order */
    private adjustContentForOrientation(lineContent: LineContent[], orientation: string): LineContent[] {
        if (orientation === 'vertical') {
            lineContent = lineContent.reverse();
        };

        return lineContent;
    }

    /* Given a matrix index for a row or column and an indication for which it is,
        calculate groups of consective tiles in that row or column */
    private calculateGroup(index: number, orientation: string): TileGroup {
        let groupCount: number = 0;
        let currentGroup: TileGroup = new TileGroup();
        let resetInd: boolean = true;
        let coord: Point = { x: undefined, y: undefined };      

        this.gameMatrix[orientation] = this.gameMatrix[orientation] instanceof Array ? this.gameMatrix[orientation] : this.getTargetMatrix(this.Utils.getGameMatrix(), orientation);
        this.targetMatrix[orientation] = this.targetMatrix[orientation] instanceof Array ? this.targetMatrix[orientation] : this.getTargetMatrix(this.goalMatrix, orientation);

        // Loop through the row, building a separate count for each group of consecutive true tiles
        for (var i = 0; i < this.sideLength; i++) {
            // If the rotated goal matrix contains a true tile at the current index...
            if (this.targetMatrix[orientation][index][i]) {
                if (!currentGroup[groupCount]) {    
                    currentGroup[groupCount] = [];
                }

                // Add the tile to the grouping.
                currentGroup[groupCount].push(
                    {
                        coord: {
                            y: index,
                            x: i
                        },
                        currentValue: this.gameMatrix[orientation][index][i],
                        goalValue: this.targetMatrix[orientation][index][i]
                    }
                );

                /* if a grouping's tiles all contain the correct values, we want to mark that group off in the view so that the user
                    can keep better track of their progress */
                this.$scope.cssClass = this.determineCssForGroup(currentGroup, index, orientation);

                resetInd = true;
            } else {
                if (resetInd) {
                    groupCount++;
                }

                resetInd = false;
            }
        };

        return currentGroup;
    }

    private determineCssForGroup(group: TileGroup, index: number, orientation: string): string {
        let groupCompleted: boolean = this.isGroupCompleted(group); 

        if (groupCompleted) {
            /* If the group is finished, we should send a message to the tile controller
                * containing the row or column's index and orientation so that
                * we can mark out the remaining tiles automatically */
            this.Utils.finishLine(index, orientation);
            return 'finishedGrouping';
        } else {
            return '';
        }   
    }

    private isGroupCompleted(group: TileGroup): boolean {
        let groupAsArray: string[] = Object.keys(group);

        return groupAsArray.every((value, index, array) => {
            return this.isGroupingCompleted(group[value]);
        });
    }

    private isGroupingCompleted(grouping: LineContent[]): boolean {
        if (Array.isArray(grouping)) {
            return grouping.every(function(value, index, array) {
                return array[index].currentValue === array[index].goalValue;
            });
        } else {
            return true;
        }
    }

    /* To compute the number lines for the current row or column, we need to find the length of each grouping */
    private getGroupings(currentGroup: TileGroup): LineContent[] {
        return Object.keys(currentGroup).map((value, index) => {
            return {
                cssClass: this.$scope.cssClass,
                text: currentGroup[value].length
            };
        });
    }

    /* To compute the number lines for the top part, we need to rotate the matrix by 90 degrees first */
    private getTargetMatrix(matrix: boolean[][], orientation: string): boolean[][] {
        if (matrix) {
            if (orientation === 'vertical') {
                return this.rotate90(matrix);
            } else {
                return matrix;
            }
        }
    }

    /* Knowing the group already exists, update the css classes on it */
    private recalculateGroup(index: number, orientation: string): boolean {
        this.gameMatrix[orientation] = this.getTargetMatrix(this.Utils.getGameMatrix(), orientation);

        /* We need to keep track if anything changed so we know whether or not to actually change lineContent,
            because if we change it regardless we'll end up with the infdig error */
        let changed: boolean = false;
        let newValue;
        let newCssClass;
        let coord;
        let currentGroupAsArray = Object.keys(this.currentGroup);
        let i = 0;
        let j;
        let groupLen = currentGroupAsArray.length;
        let entry;
        let entryLen;
        let value;

        for (; i < groupLen; i++) {
            entry = this.currentGroup[currentGroupAsArray[i]];
            entryLen = entry.length;

            for (j = 0; j < entryLen; j++) {
                value = entry[j];

                if (value.coord) {
                    newValue = this.gameMatrix[orientation][value.coord.y][value.coord.x];

                    if (value.currentValue !== newValue) {
                        value.currentValue = newValue;
                        changed = true;
                    }
                }
            }
        }   

        newCssClass = this.determineCssForGroup(this.currentGroup, index, orientation);

        if (this.$scope.cssClass !== newCssClass) {
            this.$scope.cssClass = newCssClass;
            changed = true;
        }

        return changed;
    }

    // Create a new matrix of equal size to the one passed in, and assign it to the original rotated 90 degrees
    private rotate90(matrix: boolean[][]): boolean[][] {
        var rotatedMatrix = new Array(this.sideLength);

        for (var i = 0; i < this.sideLength; i++) {
            rotatedMatrix[i] = new Array(this.sideLength);
        }
            
        for (var i = 0; i < this.sideLength; i++) {
            for (var j = 0; j < this.sideLength; j++) {
                var y = this.sideLength - i - 1,
                    x = j;

                rotatedMatrix[j][i] = matrix[y][x];
            }
        }

        return rotatedMatrix;
    }

    /* For a given row or column, compute its number line (guide numbers on the sides of the board) */
    private getLineContent(index: number, orientation: string): LineContent[] {
        if (!this.hasGroup) {
            this.currentGroup = this.calculateGroup(index, orientation);
            this.hasGroup = true;
            this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), orientation));
        } else {
            if (this.recalculateGroup(index, orientation)) {
                this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), orientation));
            };
        }

        return this.lineContent;
    }

    private getHeight(): string {
        var tileSize: number = this.Utils.getTileSize();        

        return this.$scope.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }

    private getWidth(): string {
        var tileSize: number = this.Utils.getTileSize();

        return this.$scope.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }
}

class GameMatrix {
    public horizontal: boolean[][];
    public vertical: boolean[][];
}

class LineContent {
    public cssClass: string;
    public text: any; // number or string? we'll see
}

class TileGroup {
    private coord: Point;
    private currentValue: boolean;
    private goalValue: boolean;
}