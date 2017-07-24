import { EventService } from '../../core/eventService/EventService';
import { ComponentDialogService } from '../../core/componentDialog/ComponentDialogService';

'use strict';

export class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    static $inject = [
        '$scope',
        'componentDialogService',
        'eventService'
    ];

    constructor(
        private $scope: angular.IScope,
        private componentDialogService: ComponentDialogService,
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