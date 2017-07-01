/// <reference path="../point/Point.d.ts" />

interface IUtils {
    adjustForBorders(width: number): number;
    calculatePlayableArea(): number;
    clearAll(): void;
    createEmptyMatrix(value: number): void;
    createNewGame(args: any): void; // todo
    finishLine(index: any, orientation: string): void;
    flatten(matrix: any[][]): any[][];
    getGameSize(tutorialMode: boolean): any; // todo
    getGameMatrix(): BooleanMatrix; 
    getGoalMatrix(): BooleanMatrix;
    getTileSize(tutorialMode: boolean): number;
    getTileSizePx(): string;
    prettySize(size: number): string;
    setGameSize(widthInTiles: number): void;
    setGoalMatrix(matrix: boolean[][]): void;
    setTileSize(gameWidth: number, widthInTiles: number): void;
    setOuterGameWidth(width: number): void;
    setWidth(selector: string, width: number): void;
}