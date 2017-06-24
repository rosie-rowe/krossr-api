'use strict';

class ShellController implements angular.IComponentController {
    static $name = 'ShellController'; 
}

angular.module('levels').controller(ShellController.$name, ShellController);