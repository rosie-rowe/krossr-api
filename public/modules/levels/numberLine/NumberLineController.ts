
import { BooleanMatrix } from '../matrix/BooleanMatrix'
import { LineContent } from '../lineContent/LineContent';
import { Point } from '../point/Point'
import { SideLengthService } from '../sideLengthService/SideLengthService';
import { TileGroup } from '../tileGroup/TileGroup';
import { TileSizeService } from '../tileSize/TileSizeService';

'use strict';

export class NumberLineController {
    static $inject = [
        'sideLengthService',
        'tileSizeService'
    ]

    static $name = 'NumberLineController';

    private cssClass = '';
    private gameMatrix: BooleanMatrix;
    private goalMatrix: BooleanMatrix;

    constructor(
        private sideLengthService: SideLengthService,
        private tileSizeService: TileSizeService,
    ) {
    }

    $onInit() {
        this.sideLength = this.sideLengthService.sideLength;
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
                finished: true,
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

        // Loop through the row, building a separate count for each group of consecutive true tiles
        for (var i = 0; i < this.sideLength; i++) {
            // If the rotated goal matrix contains a true tile at the current index...
            if (this.goalMatrix.getValueAt(index, i)) {
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
                        currentValue: this.gameMatrix.getValueAt(index, i),
                        goalValue: this.goalMatrix.getValueAt(index, i)
                    }
                );

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

    /* To compute the number lines for the current row or column, we need to find the length of each grouping */
    private getGroupings(currentGroup: TileGroup): LineContent[] {
        return Object.keys(currentGroup).map((value, index) => {
            return {
                finished: false,
                text: currentGroup[value].length
            };
        });
    }

    /* For a given row or column, compute its number line (guide numbers on the sides of the board) */
    private getLineContent(): LineContent[] {
        if (!this.hasGroup) {
            this.currentGroup = this.calculateGroup(this.index, this.orientation);
            this.hasGroup = true;
            this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), this.orientation));
        }

        return this.lineContent;
    }

    private getHeight(): string {
        var tileSize: number = this.tileSizeService.getTileSize();        

        return this.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }

    private getWidth(): string {
        var tileSize: number = this.tileSizeService.getTileSize();

        return this.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }
}