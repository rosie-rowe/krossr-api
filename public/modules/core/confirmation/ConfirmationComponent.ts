export class ConfirmationComponent implements angular.IComponentOptions {
    static $name = 'confirmation';
    bindToController = true;
    controller = 'ConfirmationController';
    controllerAs = 'confirmationCtrl';
    templateUrl = 'modules/core/confirmation/ConfirmationView.html';

    bindings = {
        cancelAction: '&',
        confirmAction: '&',
        submitAction: '&',
        submitText: '@'
    }
}