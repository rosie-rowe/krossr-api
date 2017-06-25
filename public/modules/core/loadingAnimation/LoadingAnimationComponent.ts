'use strict';

class LoadingAnimationComponent implements angular.IComponentOptions {
    static $name = 'loadingAnimation';
    bindToController = true;
    controller = 'LoadingAnimationController';
    controllerAs = 'loadingAnimationCtrl';
    templateUrl = 'modules/core/loadingAnimation/LoadingAnimationView.html';

    bindings = {
        condition: '<'
    }
}

angular.module('core').component(LoadingAnimationComponent.$name, new LoadingAnimationComponent());