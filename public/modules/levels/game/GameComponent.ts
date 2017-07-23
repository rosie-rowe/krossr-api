'use strict';

export default class GameComponent implements angular.IComponentOptions {
    static $name = 'game';
    bindToController = true;
    controller = 'GameController';
    controllerAs = 'gameCtrl';
    templateUrl = 'modules/levels/game/GameView.html';

    bindings = {
        gameMatrix: '<',
        goalMatrix: '<',
        level: '<',
        tiles: '<'
    };
}