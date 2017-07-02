'use strict';

/** A controller for an individual ComponentDialog, meant to provide the closeThisDialog() function & others to all of them without needing to explicity pass it in */

class ComponentDialogController implements angular.IComponentController {
    static $controllerAs = 'componentDialogCtrl';
    static $name = 'ComponentDialogController';

    private closeThisDialog: Function;

    public $onInit() {}
}

angular.module('core').controller(ComponentDialogController.$name, ComponentDialogController);