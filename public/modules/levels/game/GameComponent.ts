'use strict';

class GameComponent implements angular.IComponentOptions {
    static $name = 'game';
    bindToController = true;
    controller = 'GameController';
    controllerAs = 'gameCtrl';
    templateUrl = 'modules/levels/game/GameView.html';

    bindings = {
        level: '<',
        tiles: '<'
    };
}

angular.module('levels').component(GameComponent.$name, new GameComponent());