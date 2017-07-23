import angular from 'angular';
import ResizeDirective from './ResizeDirective';

export default angular
    .module('core.resize', [])
    .directive(ResizeDirective.$name, ($window, debounce, Utils) => new ResizeDirective($window, debounce, Utils))
    .name;