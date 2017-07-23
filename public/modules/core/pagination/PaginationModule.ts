import * as angular from 'angular';
import PaginationComponent from './PaginationComponent';
import PaginationController from './PaginationController';

export default angular
    .module('core.pagination', [])
    .component(PaginationComponent.$name, new PaginationComponent())
    .controller(PaginationController.$name, PaginationController)
    .name;