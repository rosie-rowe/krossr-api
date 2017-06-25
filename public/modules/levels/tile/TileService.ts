/// <reference path="../point/Point.d.ts" />
/// <reference path="../sideLengthService/SideLengthService.d.ts" />
/// <reference path="./TileService.d.ts" />

'use strict';

/**
 * Keeps a cache of the tiles on the screen for faster access (smooth animation for dragging & selecting),
 * as well as methods for accessing it
 */

class TileService implements ITileService {
    static $name = 'tileService';

    static $inject = [
        'sideLengthService'
    ];

    private tileIndex: any[] = [];

    constructor(
        private sideLengthService: ISideLengthService
    ) {

    }

    /** Convert a 2D coordinate into an index */
    private convertTo1D(coord: Point): number {
        return (coord.y * this.sideLengthService.sideLength) + coord.x;
    }

    addTile(obj) {
        this.tileIndex.push(obj);
    }

    clearTileIndex() {
        this.tileIndex = [];
    }

    /** Convert an index into a 2D coordinate */
    convertTo2D(index: number): Point {
        let x = index % this.sideLengthService.sideLength;
        let y = (index - x) / this.sideLengthService.sideLength;

        let coord = {
            y: y,
            x: x
        };

        return coord;
    }
   
    eraseTiles() {
        let len = this.tileIndex.length;

        for (let i = 0; i < len; i++) {
            this.tileIndex[i].tileCtrl.fill('empty');
        }
    }

    fillTiles(coords, initState, override, validationFn?) {
        let len = coords.length;
    
        for (let i = 0; i < len; i++) {
            let currentCoord = coords[i];
            let currentTileController = this.findTileCtrlByCoord(currentCoord);
    
            if (!validationFn || (typeof currentTileController[validationFn] === 'function' && currentTileController[validationFn]())) {
                currentTileController.change(currentCoord, initState, override);
            }
        }
    }

    findTileCtrlByCoord(coord) {
        var index = this.convertTo1D(coord);
        return this.findTileCtrlByIndex(index); 
    }

     
    findTileCtrlByIndex(index) {
        return this.tileIndex[index].tileCtrl;
    }

    
    getTileIndex() {
        return this.tileIndex;
    }
}

angular.module('levels').service(TileService.$name, TileService);