import LevelSelectController from './LevelSelectController';

'use strict';

export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        bindToController: true,
        controller: LevelSelectController,
        controllerAs: LevelSelectController.$controllerAs,
        templateUrl: 'modules/levels/levelSelect/LevelSelectView.html'
    }
}