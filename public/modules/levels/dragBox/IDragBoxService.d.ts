import { Point } from '../point/Point';

export interface IDragBoxService {
    initState: boolean;
    startCoord: Point;
    endCoord: Point;

    clearDragBox(): void;
    fill(override: string): void;
    process(): Point[];
    validateStart(): Point;
    validate(): Point;
}