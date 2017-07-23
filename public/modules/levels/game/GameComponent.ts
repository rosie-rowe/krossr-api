import GameController from './GameController';

'use strict';

export default function() {
    return {
        bindings: {
            gameMatrix: '<',
            goalMatrix: '<',
            level: '<',
            tiles: '<'
        },
        bindToController: true,
        controller: GameController,
        controllerAs: GameController.$controllerAs,
        templateUrl: 'modules/levels/game/GameView.html'
    }
}