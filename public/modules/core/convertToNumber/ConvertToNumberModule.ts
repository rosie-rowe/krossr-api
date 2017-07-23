import * as angular from 'angular';
import ConvertToNumberDirective from './ConvertToNumberDirective';

export default angular
    .module('core.convertToNumber', [])
    .directive('convertToNumber', () => new ConvertToNumberDirective())
    .name;