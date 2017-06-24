'use strict';

class ShiftService {
    static $name = 'shiftService';
    private _shiftOn: boolean = false;

    get shiftOn(): boolean {
        return this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }

    constructor() {}
}

angular.module('levels').service(ShiftService.$name, ShiftService);