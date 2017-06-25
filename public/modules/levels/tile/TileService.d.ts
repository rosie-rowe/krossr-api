/// <reference path="../point/Point.d.ts" />

interface ITileService {
    /** Append the current tile index */
    addTile(obj: any): void;

    /** Make sure the index is clean before we add to it, to avoid bugs with switching between screens */
    clearTileIndex(): void;

    /** Convert an index into a 2D coordinate */
    convertTo2D(index: number): Point;

    /** Empty out all of the tiles, but keep them on-screen */ 
    eraseTiles(): void;

    /**
     * Fill all of the tiles in the specified coordinate array
     * @params {Array} array of coordinate objects
     * @params {function} a function to run on each tile controller before changing it to determine whether or not to change. must be defined in TileController
     */
    fillTiles(coords: Point[], initState, override, validationFn?): void; // todo

    /** Grab a tile controller out of the tile index from a given 2D coordinate */
    findTileCtrlByCoord(coord: Point): any; // todo

    /** Grab a tile controller out of the tile index from a given 1D index */
    findTileCtrlByIndex(index: number): any; // todo

    /** Return the current tileIndex */ 
    getTileIndex(): any // todo
}