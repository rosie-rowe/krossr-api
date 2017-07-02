import { IEventService } from '../../core/event/IEventService';

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