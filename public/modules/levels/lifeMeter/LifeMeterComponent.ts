'use strict';

export class LifeMeterComponent implements angular.IComponentOptions {
    static $name = 'lifeMeter';
    bindToController = true;
    controller = 'LifeMeterController';
    controllerAs = 'lifeMeterCtrl';
    templateUrl = 'modules/levels/lifeMeter/LifeMeterView.html';

    bindings = {
        lives: '<'
    }
}