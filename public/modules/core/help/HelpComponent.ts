'use strict';

export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        bindToController: true,
        controllerAs: 'helpCtrl',
        templateUrl: 'modules/core/help/HelpView.html'
    }
}