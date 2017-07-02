'use strict';

class ConfirmationController implements angular.IComponentController {
    static $controllerAs = 'confirmationCtrl';
    static $name = 'ConfirmationController';

    static $inject = [
        'ngDialog'
    ];

    private cancelAction: Function;
    private confirmAction: Function;
    private submitAction: Function;
    private submitText: string;

    constructor(
        private ngDialog
    ) {

    }

    public $onInit() {}
}

angular.module('core').controller(ConfirmationController.$name, ConfirmationController);