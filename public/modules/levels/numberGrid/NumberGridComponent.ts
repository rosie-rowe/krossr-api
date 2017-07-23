import NumberGridController from './NumberGridController';

'use strict';

export default function() {
    return {
        bindings: {
            gameMatrix: '<',
            goalMatrix: '<',
            orientation: '@',
        },
        bindToController: true,
        controller: NumberGridController,
        controllerAs: NumberGridController.$controllerAs,
        templateUrl: 'modules/levels/numberGrid/NumberGridView.html'
    }
}