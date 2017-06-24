/// <reference path="../point/point.ts" />

'use strict';

class DragBox {
    private _initState: boolean = true;
    get initState(): boolean {
        return this._initState;
    }
    set initState(state: boolean) {
        this._initState = state;
    }

    private _startCoord: Point;
    get startCoord() {
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

    constructor() {}

    public clearDragBox() {
        this.startCoord = undefined;
        this.endCoord = undefined;
        this.initState = true;
    }
    
    /*
    * Given a dragbox, return an array of all of the coordinates of included tiles
    */
    public process(): Point[] {
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

    public validateStart() {
        return this.startCoord;
    }

    public validate() {
        return this.startCoord && this.endCoord;
    }
}

angular.module('levels').service('dragBoxService', DragBox);