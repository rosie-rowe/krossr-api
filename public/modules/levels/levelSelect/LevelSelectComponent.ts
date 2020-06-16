export class LevelSelectComponent implements angular.IComponentOptions {
    static $name = 'levelSelect';
    bindToController = true;
    controller = 'LevelSelectController';
    controllerAs = 'levelSelectCtrl';
    templateUrl = 'modules/levels/levelSelect/LevelSelectView.html';

    bindings = {
        closeAction: '&'
    }
}