/** A controller for an individual ComponentDialog, meant to provide the closeThisDialog() function & others to all of them without needing to explicity pass it in */

export class ComponentDialogController implements angular.IController {
    static $controllerAs = 'componentDialogCtrl';
    static $name = 'ComponentDialogController';

    private closeThisDialog: Function;

    public $onInit() {
        // TSBUG
    }
}