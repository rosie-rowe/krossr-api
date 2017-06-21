'use strict';

class NumberGridComponent implements angular.IComponentOptions {
    controller = 'NumberGridController';
    controllerAs = 'numGridCtrl'
    templateUrl = 'modules/levels/numberGrid/NumberGridView.html';

    bindings = {
        orientation: '@',
        layout: '=',
        ctrl: '='
    }

    bindToController = true;

    constructor(

    ) {

    }
}

angular.module('levels').component('numberGrid', new NumberGridComponent());