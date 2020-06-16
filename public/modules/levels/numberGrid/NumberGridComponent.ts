export class NumberGridComponent implements angular.IComponentOptions {
    static $name = 'numberGrid';
    controller = 'NumberGridController';
    controllerAs = 'numGridCtrl'
    templateUrl = 'modules/levels/numberGrid/NumberGridView.html';

    bindings = {
        gameMatrix: '<',
        goalMatrix: '<',
        orientation: '@',
    };

    bindToController = true;
}