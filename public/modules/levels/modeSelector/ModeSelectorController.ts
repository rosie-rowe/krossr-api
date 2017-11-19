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

    private modes: IMode[]; 
    private selectedMode: string;

    $onInit() {
        this.modes = [
            {
                name: 'Select',
                onSelect: () => this.shiftService.shiftLock = false
            },
            {
                name: 'Mark',
                onSelect: () => this.shiftService.shiftLock = true
            }
        ];

        this.selectMode(this.modes[0]);
    }

    selectMode(mode: IMode) {
        this.selectedMode = mode.name;

        mode.onSelect();
    }
}

interface IMode {
    name: string;
    onSelect: Function;
}