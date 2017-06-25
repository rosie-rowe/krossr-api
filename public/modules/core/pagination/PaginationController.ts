'use strict';

class PaginationController implements angular.IComponentController {
    static $controllerAs = 'paginationCtrl';
    static $name = 'PaginationController';
}

angular.module('core').controller(PaginationController.$name, PaginationController);