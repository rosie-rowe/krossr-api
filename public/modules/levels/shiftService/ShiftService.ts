import * as angular from 'angular';
import { IShiftService } from './IShiftService';

'use strict';

class ShiftService implements IShiftService {
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