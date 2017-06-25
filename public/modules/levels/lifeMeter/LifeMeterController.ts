'use strict';

class LifeMeterController implements angular.IComponentOptions {
    static $controllerAs = 'lifeMeterCtrl';
    static $name = 'LifeMeterController';

    private lives;
}

angular.module('levels').controller(LifeMeterController.$name, LifeMeterController);