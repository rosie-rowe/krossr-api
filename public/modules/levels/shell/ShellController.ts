/// <reference path="../../core/eventService/EventService.d.ts" />

'use strict';

class ShellController implements angular.IComponentController {
    static $controllerAs = 'shellCtrl';
    static $name = 'ShellController'; 

    static $inject = [
        '$scope',
        'eventService'
    ];

    private margin: number;

    constructor(
        private $scope: angular.IScope,
        private eventService: IEventService
    ) {

    }

    $postLink() {
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', (e, args) => {
            let newSize = Math.floor(args);
            this.margin = newSize / 2;
        })
    }
}

angular.module('levels').controller(ShellController.$name, ShellController);