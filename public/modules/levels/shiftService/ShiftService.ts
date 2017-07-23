import { IShiftService } from './IShiftService';

'use strict';

class ShiftService implements IShiftService {
    private _shiftOn: boolean = false;

    get shiftOn(): boolean {
        return this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }

    constructor() {}
}

export default function() {
    return ShiftService;
}