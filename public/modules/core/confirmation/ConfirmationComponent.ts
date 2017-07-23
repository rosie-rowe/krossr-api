import ConfirmationController from './ConfirmationController';

'use strict';

export default function() {
    return {
        bindings: {
            cancelAction: '&',
            confirmAction: '&',
            submitAction: '&',
            submitText: '@'
        },
        bindToController: true,
        controller: ConfirmationController,
        controllerAs: ConfirmationController.$controllerAs,
        templateUrl: 'modules/core/confirmation/ConfirmationView.html'
    }
}