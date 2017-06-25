'use strict';

class GameOverComponent implements angular.IComponentOptions {
    static $name = 'gameOver';
    bindToController = true;
    controller = 'GameOverController';
    controllerAs = 'gameOverCtrl';
    templateUrl = 'modules/levels/gameOver/GameOverView.html';

    bindings = {
        closeAction: '&',
        levelId: '@',
        won: '<'
    }
}

angular.module('levels').component(GameOverComponent.$name, new GameOverComponent());