/// <reference path="../utils/Utils.d.ts" />

'use strict';

class NumberGridController implements angular.IComponentController {
    static $name = 'NumberGridController';

    static $inject = [
        'Utils'
    ];

    constructor(
        private Utils: IUtils
    ) {

    }

    private tileSize: string;

    $onInit() {
        this.tileSize = this.Utils.getTileSizePx();
    }

    getFontSize() {
        return parseInt(this.tileSize, 10) / 2 + 'px';
    }
}

angular.module('levels').controller(NumberGridController.$name, NumberGridController);