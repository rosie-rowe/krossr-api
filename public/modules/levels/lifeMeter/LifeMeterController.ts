'use strict';

class LifeMeterController implements angular.IComponentController {
    static $controllerAs = 'lifeMeterCtrl';
    static $name = 'LifeMeterController';

    private lives;

    $onInit() {}
}

angular.module('levels').controller(LifeMeterController.$name, LifeMeterController);