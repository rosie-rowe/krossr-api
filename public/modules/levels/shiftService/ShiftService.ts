import { IShiftService } from './IShiftService';

'use strict';

export default class ShiftService implements IShiftService {
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