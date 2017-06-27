/// <reference path="../../core/event/EventService.d.ts" />

'use strict';

class ShellController implements angular.IComponentController {
    static $controllerAs = 'shellCtrl';
    static $name = 'ShellController'; 

    static $inject = [
    ];


    constructor(
    ) {

    }
}

angular.module('levels').controller(ShellController.$name, ShellController);