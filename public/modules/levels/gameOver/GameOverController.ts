import { EventService } from '../../core/eventService/EventService';
import { IComponentDialogService } from '../../core/componentDialog/IComponentDialogService';

'use strict';

export default class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    static $inject = [
        '$scope',
        'componentDialogService',
        'eventService'
    ];

    constructor(
        private $scope: angular.IScope,
        private componentDialogService: IComponentDialogService,
        private eventService: EventService
    ) {

    }

    private closeAction: Function;

    private clearAll() {
        this.eventService.publish('level.clearAll');
    }

    $onInit() {}

    close() {
        this.closeAction();
        this.clearAll();
    }

    newLevel() {
        this.close();
        this.componentDialogService.open('level-select');
    }
}