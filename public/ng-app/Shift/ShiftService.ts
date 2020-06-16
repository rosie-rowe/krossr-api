import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ShiftService {
    static $name = 'shiftService';
    private _shiftLock: boolean = false;
    private _shiftOn: boolean = false;

    get shiftOn(): boolean {
        return this._shiftLock || this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }

    set shiftLock(value: boolean) {
        this._shiftLock = value;
    }
}