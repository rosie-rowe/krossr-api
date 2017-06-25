/// <reference path="../point/Point.d.ts" />

interface IUtils {
    addTileToIndex(obj: any): void;
    adjustForBorders(width: number): number;
    calculatePlayableArea(): number;
    clearAll(): void;
    clearAllMatrix(matrix: boolean[][], value: boolean): boolean[][]; // todo
    clearAllTiles(): void;
    clearTileIndex(): void;
    convertTo1D(coord: Point): number;
    convertTo2D(index: number): Point;
    createEmptyMatrix(value: number): void;
    createNewGame(args: any): void; // todo
    finishLine(index: any, orientation: string): void;
    flatten(matrix: any[][]): any[][];
    getGameSize(tutorialMode: boolean): any; // todo
    getGameMatrix(): any[][] // todo
    getGoalMatrix(): any[][] // todo
    getSideLength(): number;
    getTileIndex(): any // todo
    getTileSize(tutorialMode: boolean): number;
    getTileSizePx(): string;
    getWidth(selector: string): number;
    prettySize(size: number): string;
    setCoord(y: number, x: number, value: boolean): void;
    setGameSize(widthInTiles: number): void;
    setGoalMatrix(matrix: boolean[][]): void;
    setSideLength(length: number): void;
    setTileSize(gameWidth: number, widthInTiles: number): void;
    setOuterGameWidth(width: number): void;
    setWidth(selector: string, width: number): void;
    updateLevel(level: any, scope: angular.IScope): void;
}