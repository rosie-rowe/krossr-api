/// <reference path="../point/Point.d.ts" />

interface IDragBoxService {
    initState: boolean;
    startCoord: Point;
    endCoord: Point;

    clearDragBox(): void;
    fill(override: string): void;
    process(): Point[];
    validateStart(): Point;
    validate(): Point;
}