import LifeMeterController from './LifeMeterController';

'use strict';

export default function() {
    return {
        bindings: {
            lives: '<'
        },
        bindToController: true,
        controller: LifeMeterController,
        controllerAs: LifeMeterController.$controllerAs,
        templateUrl: 'modules/levels/lifeMeter/LifeMeterView.html'
    }
}