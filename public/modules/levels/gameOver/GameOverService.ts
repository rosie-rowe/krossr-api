import { ILevel } from "../level/Level";

'use strict';

/** Open the Game Over popup */

export class GameOverService {
    static $name = 'gameOverService';

    static $inject = [
        'ngDialog'
    ];

    constructor(
        private ngDialog: angular.dialog.IDialogService
    ) {

    }

    openDialog(level: ILevel): void {
        this.ngDialog.open({
            plain: true,
            template: `<game-over close-action="closeThisDialog()" level-id="${level.id}" won="${level.won}"></game-over>`,
            showClose: false
        });
    }
}