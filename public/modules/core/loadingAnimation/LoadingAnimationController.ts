'use strict';

class LoadingAnimationController implements angular.IComponentController {
    static controllerAs = 'loadingAnimationCtrl';
    static $name = 'LoadingAnimationController';

    private condition: boolean;
}

angular.module('core').controller(LoadingAnimationController.$name, LoadingAnimationController);