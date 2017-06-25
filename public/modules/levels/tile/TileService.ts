/// <reference path="../point/Point.d.ts" />

'use strict';

/**
 * Keeps a cache of the tiles on the screen for faster access (smooth animation for dragging & selecting),
 * as well as methods for accessing it
 */

class TileService {
    static $name = 'tileService';

    private tileIndex: any[] = [];

    /** Convert a 2D coordinate into an index */
    private convertTo1D(coord: Point, sideLength: number): number {
        return (coord.y * sideLength) + coord.x;
    }

    addTile(obj) {
        this.tileIndex.push(obj);
    }

    clearTileIndex() {
        this.tileIndex = [];
    }

    /** Convert an index into a 2D coordinate */
    convertTo2D(index: number, sideLength: number): Point {
        let x = index % sideLength;
        let y = (index - x) / sideLength;

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

    findTileCtrlByCoord(coord, sideLength) {
        var index = this.convertTo1D(coord, sideLength);
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