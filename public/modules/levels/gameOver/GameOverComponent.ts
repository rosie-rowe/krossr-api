export class GameOverComponent implements angular.IComponentOptions {
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