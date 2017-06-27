/// <reference path="../../core/event/EventService.d.ts" />
/// <reference path="../../levels/levelSelect/LevelSelectService.d.ts" />

'use strict';

class GameOverController implements angular.IComponentController {
    static $controllerAs = 'gameOverCtrl';
    static $name = 'GameOverController';

    static $inject = [
        '$scope',
        'eventService',
        'levelSelectService'
    ];

    constructor(
        private $scope: angular.IScope,
        private eventService: IEventService,
        private levelSelectService: ILevelSelectService
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
        this.levelSelectService.openLevelSelect();
    }
}

angular.module('levels').controller(GameOverController.$name, GameOverController);