'use strict';

class Shift {
    private _shiftOn: boolean = false;

    get shiftOn(): boolean {
        return this._shiftOn;
    }

    set shiftOn(value: boolean) {
        this._shiftOn = value;
    }

    constructor() {}
}

angular.module('levels').factory('shiftService', [
	function() { return new Shift(); }
]);