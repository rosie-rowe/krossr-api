import * as angular from 'angular';
import PaginationComponent from './PaginationComponent';
import PaginationController from './PaginationController';

export default angular
    .module('core.pagination', [])
    .component('pagination', PaginationComponent)
    .controller(PaginationController.$name, PaginationController)
    .name;