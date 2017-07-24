import * as angular from 'angular';

'use strict';

/** Keeps track of the length of a side for a game -- it is used in many calculations & in many places */

export class SideLengthService {
    static $name = 'sideLengthService';

    private _sideLength: number;

    get sideLength(): number {
        return this._sideLength;
    }

    set sideLength(length: number) {
        this._sideLength = length;
    }
}