import { TileService } from '../tile/TileService';
import { Point } from '../point/Point';

'use strict';

export class DragBoxService {
    static $name = 'dragBoxService';

    static $inject = [
        'tileService'
    ];

    private _initState: boolean = true;

    get initState(): boolean {
        return this._initState;
    }

    set initState(state: boolean) {
        this._initState = state;
    }

    private _startCoord: Point;

    get startCoord(): Point {
        return this._startCoord;
    }
    set startCoord(coord: Point) {
        this._startCoord = coord;
    }


    private _endCoord: Point;

    get endCoord() {
        return this._endCoord;
    }
    set endCoord(coord: Point) {
        this._endCoord = coord;
    }

    constructor(
        private tileService: TileService
    ) {

    }

    clearDragBox(): void {
        this.startCoord = undefined;
        this.endCoord = undefined;
        this.initState = true;
    }

    /**
     * Change the tiles in the dragbox to the correct state
     */
    fill(override: string): void {
        if (this.validate()) {
            this.tileService.fillTiles(this.process(), this.initState, override, 'isNotSelected');
            this.clearDragBox();
        }
    }

    
    /*
    * Given a dragbox, return an array of all of the coordinates of included tiles
    */
    process(): Point[] {
        if (!this.validate()) {
            return [];
        }

        let startX = this.startCoord.x;
        let startY = this.startCoord.y;
        let endX = this.endCoord.x;
        let endY = this.endCoord.y;
        let finalCoords: Point[] = [];

        if (startX > endX) {
            [endX, startX] = [startX, endX];
        }

        if (startY > endY) {
            [endY, startY] = [startY, endY];
        }

        for (let i = startY; i <= endY; i++) {
            for (let j = startX; j <= endX; j++) {
                let coord: Point = {
                    x: j,
                    y: i
                };

                finalCoords.push(coord);
            }
        }

        return finalCoords;
    }

    validateStart(): Point {
        return this.startCoord;
    }

    validate(): Point {
        return this.startCoord && this.endCoord;
    }
}