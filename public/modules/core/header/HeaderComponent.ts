'use strict';

class HeaderComponent implements angular.IComponentOptions {
    static $name = 'krossrHeader';
    controller = 'HeaderController';
    controllerAs = 'headerCtrl';
    templateUrl = 'modules/core/header/HeaderView.html';
}

angular.module('core').component(HeaderComponent.$name, new HeaderComponent());