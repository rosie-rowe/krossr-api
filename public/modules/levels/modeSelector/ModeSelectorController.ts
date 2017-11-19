import { ShiftService } from '../shiftService/ShiftService';

'use strict';

export class ModeSelectorController implements angular.IComponentController {
    static $name = 'ModeSelectorController';

    static $inject = [
        'shiftService'
    ];

    constructor(
        private shiftService: ShiftService
    ) {

    }

    $onInit() {
        
    }
}