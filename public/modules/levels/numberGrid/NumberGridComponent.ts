'use strict';

class NumberGridComponent implements angular.IComponentOptions {
    controller = 'NumberGridController';
    controllerAs = 'numGridCtrl'
    templateUrl = 'modules/levels/numberGrid/NumberGridView.html';

    bindings = {
        gameMatrix: '<',
        goalMatrix: '<',
        orientation: '@',
    }

    bindToController = true;

    constructor(

    ) {

    }
}

angular.module('levels').component('numberGrid', new NumberGridComponent());