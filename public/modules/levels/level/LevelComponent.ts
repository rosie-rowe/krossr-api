import LevelController from './LevelController';

'use strict'

export default function() {
    return {
        bindings: {
            controller: '@'
        },
        bindToController: true,
        controller: LevelController,
        controllerAs: LevelController.$controllerAs,
        templateUrl: 'modules/levels/level/LevelView.html'
    }
}
