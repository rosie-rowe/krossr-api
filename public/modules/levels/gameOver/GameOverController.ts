import { ComponentDialogService } from '../../core/componentDialog/ComponentDialogService';

'use strict';

export class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    static $inject = [
        'componentDialogService',
    ];

    constructor(
        private componentDialogService: ComponentDialogService
    ) {

    }

    private closeAction: Function;

    $onInit() {}

    newLevel() {
        this.closeAction();
        this.componentDialogService.open('level-select');
    }
}