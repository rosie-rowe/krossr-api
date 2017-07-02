import { IComponentDialogService } from '../../core/componentDialog/IComponentDialogService';
import { IEventService } from '../../core/event/IEventService';

'use strict';

class GameOverController implements angular.IComponentController {
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
        private eventService: IEventService
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

angular.module('levels').controller(GameOverController.$name, GameOverController);