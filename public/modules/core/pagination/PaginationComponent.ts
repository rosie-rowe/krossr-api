import PaginationController from './PaginationController';

'use strict';

export default function() {
    return {
        bindings: {
            onPagination: '&',
            currentPage: '=', // todo
            totalPages: '<'
        },
        bindToController: true,
        controller: PaginationController,
        controllerAs: PaginationController.$controllerAs,
        templateUrl: 'modules/core/pagination/PaginationView.html',
    }
}