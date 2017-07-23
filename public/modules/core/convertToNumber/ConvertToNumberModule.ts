import angular from 'angular';
import ConvertToNumberDirective from './ConvertToNumberDirective';

export default angular
    .module('core.convertToNumber')
    .directive(ConvertToNumberDirective.$name, () => new ConvertToNumberDirective())
    .name;