'use strict'

class LevelComponent {
    static $name = 'level';
    bindToController = true;
    controller = 'LevelController';
    controllerAs = 'levelCtrl';
    templateUrl = 'modules/levels/level/LevelView.html';

    bindings = {
        ctrl: '=',
        controller: '@'
    }
}

angular.module('levels').component(LevelComponent.$name, new LevelComponent());