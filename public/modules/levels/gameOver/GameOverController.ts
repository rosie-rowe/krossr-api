'use strict';

class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    private closeAction: Function;
}

angular.module('levels').controller(GameOverController.$name, GameOverController);