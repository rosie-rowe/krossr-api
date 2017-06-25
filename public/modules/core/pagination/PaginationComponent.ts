'use strict';

class PaginationComponent implements angular.IComponentOptions {
    static $name = 'pagination';
    bindToController = true;
    controller = 'PaginationController';
    controllerAs = 'paginationCtrl';
    templateUrl = 'modules/levels/pagination/PaginationView.html';

    bindings = {
    }
}

angular.module('core').component(PaginationComponent.$name, new PaginationComponent());