/// <reference path="./GameOverService.d.ts" />

'use strict';

/** Open the Game Over popup */

class GameOverService implements IGameOverService {
    static $name = 'gameOverService';

    static $inject = [
        'ngDialog'
    ];

    constructor(
        private ngDialog
    ) {

    }

    openDialog(level) {
        this.ngDialog.open({
            plain: true,
            template: '<game-over close-action="closeThisDialog()" level-id="' + level.id +'" won="' + level.won + '"></game-over>',
            //scope: this.$scope,
            showClose: false
        });
    }
}

angular.module('levels').service(GameOverService.$name, GameOverService);