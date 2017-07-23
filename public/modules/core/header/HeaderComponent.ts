import HeaderController from './HeaderController';

'use strict';

export default function() {
    return {
        controller: HeaderController,
        controllerAs: HeaderController.$controllerAs,
        template: 'modules/core/header/HeaderView.html'
    }
}