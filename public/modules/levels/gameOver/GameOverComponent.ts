import GameOverController from './GameOverController';

'use strict';

export default function() {
    return {
        bindings: {
            closeAction: '&',
            levelId: '@',
            won: '<'
        },
        bindToController: true,
        controller: GameOverController,
        controllerAs: GameOverController.$controllerAs,
        templateUrl: 'modules/levels/gameOver/GameOverView.html'
    }
}