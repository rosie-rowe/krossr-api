import { BooleanMatrix } from '../matrix/BooleanMatrix';

export interface IUtils {
    adjustForBorders(width: number): number;
    calculatePlayableArea(): number;
    clearAll(): void;
    createEmptyMatrix(value: number): void;
    createNewGame(args: any): void; // todo
    flatten(matrix: any[][]): any[][];
    getGameSize(tutorialMode: boolean): any; // todo
    getGameMatrix(): BooleanMatrix; 
    getGoalMatrix(): BooleanMatrix;
    getTileSize(tutorialMode: boolean): number;
    getTileSizePx(): string;
    prettySize(size: number): string;
    setGameSize(widthInTiles: number): void;
    setTileSize(gameWidth: number, widthInTiles: number): void;
    setOuterGameWidth(width: number): void;
    setWidth(selector: string, width: number): void;
}