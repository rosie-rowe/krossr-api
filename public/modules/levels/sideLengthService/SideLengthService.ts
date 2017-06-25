/// <reference path="./SideLengthService.d.ts" />

'use strict';

/** Keeps track of the length of a side for a game -- it is used in many calculations & in many places */

class SideLengthService implements ISideLengthService {
    static $name = 'sideLengthService';

    private _sideLength: number;

    get sideLength() {
        return this._sideLength;
    }

    set sideLength(length: number) {
        this._sideLength = length;
    }
}

angular.module('levels').service(SideLengthService.$name, SideLengthService);