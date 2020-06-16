export class PaginationController implements angular.IComponentController {
    static $controllerAs = 'paginationCtrl';
    static $name = 'PaginationController';

    static $inject = [];

    constructor() {}

    private currentPage: number;
    private totalPages: number;
    private onPagination: Function;

    $onInit() {}

    pageDown() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.onPagination({
                currentPage: this.currentPage
            });
        }
    }

    pageUp() {
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
            this.onPagination({
                currentPage: this.currentPage
            });
        }
    }
}