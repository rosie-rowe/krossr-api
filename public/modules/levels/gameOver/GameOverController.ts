/// <reference path="../../core/eventService/EventService.d.ts" />

'use strict';

class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    static $inject = [
        '$scope',
        'eventService'
    ];

    constructor(
        private $scope: angular.IScope,
        private eventService: IEventService
    ) {

    }

    private closeAction: Function;

    private clearAll() {
        this.eventService.publish('level.clearAll');
    }

    close() {
        this.closeAction();
        this.clearAll();
    }

    newLevel() {
        this.close();
        //levelCtrl.openLevelSelect();
    }
}

angular.module('levels').controller(GameOverController.$name, GameOverController);