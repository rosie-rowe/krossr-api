export class ConfirmationController implements angular.IComponentController {
    static $controllerAs = 'confirmationCtrl';
    static $name = 'ConfirmationController';

    private cancelAction: Function;
    private confirmAction: Function;
    private submitAction: Function;
    private submitText: string;
}