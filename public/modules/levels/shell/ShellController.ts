/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../../core/eventService/EventService.d.ts" />

'use strict';

class ShellController implements angular.IComponentController {
    static $controllerAs = 'shellCtrl';
    static $name = 'ShellController'; 

    static $inject = [
        '$scope',
        '$timeout',
        'eventService',
        'Utils'
    ];

    private margin: number;

    private options = {
        size: 25
    };

    constructor(
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService,
        private eventService: IEventService,
        private Utils: IUtils
    ) {

    }

    $postLink() {
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', (e, args) => {
            let newSize = Math.floor(args);
            this.margin = newSize / 2;
        })
    }

    createGameArray(controller) {
        this.Utils.createNewGame({
            numberOfTiles: this.options.size,
            controller: controller
        });
    }

    setGameSize(size) {
        this.Utils.setGameSize(Math.sqrt(size));
    }
}

angular.module('levels').controller(ShellController.$name, ShellController);