'use strict';

export default class LoadingAnimationComponent implements angular.IComponentOptions {
    static $name = 'loadingAnimation';
    bindToController = true;
    controller = 'LoadingAnimationController';
    controllerAs = 'loadingAnimationCtrl';
    templateUrl = 'modules/core/loadingAnimation/LoadingAnimationView.html';

    bindings = {
        condition: '<'
    }
}