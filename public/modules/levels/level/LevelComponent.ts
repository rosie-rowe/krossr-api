export class LevelComponent {
    static $name = 'level';
    bindToController = true;
    controller = 'LevelController';
    controllerAs = 'levelCtrl';
    templateUrl = 'modules/levels/level/LevelView.html';

    bindings = {
        controller: '@'
    }
}
