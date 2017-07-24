'use strict';

/** Open the Game Over popup */

export class GameOverService {
    static $name = 'gameOverService';

    static $inject = [
        'ngDialog'
    ];

    constructor(
        private ngDialog
    ) {

    }

    openDialog(level: any): void { // todo
        this.ngDialog.open({
            plain: true,
            template: '<game-over close-action="closeThisDialog()" level-id="' + level.id +'" won="' + level.won + '"></game-over>',
            //scope: this.$scope,
            showClose: false
        });
    }
}