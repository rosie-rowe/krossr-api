'use strict';

/** A controller for an individual ComponentDialog, meant to provide the closeThisDialog() function & others to all of them without needing to explicity pass it in */

class ComponentDialogController {
    static $controllerAs = 'componentDialogCtrl';
    static $name = 'ComponentDialogController';

    private closeThisDialog: Function;
}

angular.module('core').controller(ComponentDialogController.$name, ComponentDialogController);