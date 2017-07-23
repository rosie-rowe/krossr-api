import { IUtils } from '../utils/IUtils';

import { BooleanMatrix } from '../matrix/BooleanMatrix'
import { Point } from '../point/Point'

'use strict';

export default class NumberLineController {
    static $inject = [
        'Utils'
    ]

    static $name = 'NumberLineController';

    private cssClass = '';
    private gameMatrix: BooleanMatrix;
    private goalMatrix: BooleanMatrix;

    constructor(
        private Utils: IUtils
    ) {
    }

    $onInit() {
        let layout = this.Utils.getGoalMatrix();
        this.sideLength = layout.length;
    }

    private sideLength: number;
    private lineContent: LineContent[] = [];
    private currentGroup: TileGroup = new TileGroup();
    private hasGroup: boolean = false;

    private index: number;
    private orientation: string;

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

        let logLater = false;

        if (orientation == 'horizontal') {
            logLater = true;
        }

        // Loop through the row, building a separate count for each group of consecutive true tiles
        for (var i = 0; i < this.sideLength; i++) {
            // If the rotated goal matrix contains a true tile at the current index...
            if (this.goalMatrix.getValueAt(index, i)) {
                if (!currentGroup[groupCount]) {    
                    currentGroup[groupCount] = [];
                }

                if (logLater) {
                    console.log('Added a point to a group.');
                    console.log(`y ${index} x ${i}`);
                }

                // Add the tile to the grouping.
                currentGroup[groupCount].push(
                    {
                        coord: {
                            y: index,
                            x: i
                        },
                        currentValue: this.gameMatrix.getValueAt(index, i),
                        goalValue: this.goalMatrix.getValueAt(index, i)
                    }
                );

                /* if a grouping's tiles all contain the correct values, we want to mark that group off in the view so that the user
                    can keep better track of their progress */

                if (currentGroup[groupCount][0].coord.x === 0 && currentGroup[groupCount][0].coord.y === 0) {
                    console.log('deciding..');
                }

                this.cssClass = this.determineCssForGroup(currentGroup);

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

    private determineCssForGroup(group: TileGroup): string {
        let groupCompleted = this.isGroupCompleted(group); 

        if (groupCompleted) {
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

    private isGroupingCompleted(grouping: TileGroup[]): boolean {
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
                cssClass: this.cssClass,
                text: currentGroup[value].length
            };
        });
    }

    /* Knowing the group already exists, update the css classes on it */
    private recalculateGroup(index: number, orientation: string): boolean {
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
                    newValue = this.gameMatrix.getValueAt(value.coord.y, value.coord.x);

                    if (value.currentValue !== newValue) {
                        value.currentValue = newValue;
                        changed = true;
                    }
                }
            }
        }   

        newCssClass = this.determineCssForGroup(this.currentGroup);

        if (this.cssClass !== newCssClass) {
            this.cssClass = newCssClass;
            changed = true;
        }

        return changed;
    }

    /* For a given row or column, compute its number line (guide numbers on the sides of the board) */
    private getLineContent(): LineContent[] {
        if (!this.hasGroup) {
            this.currentGroup = this.calculateGroup(this.index, this.orientation);
            this.hasGroup = true;
            this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), this.orientation));
        } else {
            if (this.recalculateGroup(this.index, this.orientation)) {
                this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), this.orientation));
            };
        }

        return this.lineContent;
    }

    private getHeight(): string {
        var tileSize: number = this.Utils.getTileSize(false);        

        return this.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }

    private getWidth(): string {
        var tileSize: number = this.Utils.getTileSize(false);

        return this.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }
}

class LineContent {
    public cssClass: string;
    public text: any; // number or string? we'll see
}

class TileGroup {
    coord: Point;
    currentValue: boolean;
    goalValue: boolean;
}