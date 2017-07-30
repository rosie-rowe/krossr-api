import * as angular from 'angular';
import { ResizeDirective } from './ResizeDirective';

export default angular
    .module('core.resize', [])
    .directive(ResizeDirective.$name, ($window, debounce, gameSizeService, Utils) => new ResizeDirective($window, debounce, gameSizeService, Utils))
    .name;