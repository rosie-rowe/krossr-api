'use strict';

export class PaginationComponent implements angular.IComponentOptions {
    static $name = 'pagination';
    bindToController = true;
    controller = 'PaginationController';
    controllerAs = 'paginationCtrl';
    templateUrl = 'modules/core/pagination/PaginationView.html';

    bindings = {
        onPagination: '&',
        currentPage: '=', // todo
        totalPages: '<'
    }
}