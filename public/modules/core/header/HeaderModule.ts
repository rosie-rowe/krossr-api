import angular from 'angular';
import HeaderComponent from './HeaderComponent';
import HeaderController from './HeaderController';

export default angular
    .module('core.header')
    .component(HeaderComponent.$name, new HeaderComponent())
    .controller(HeaderController.$name, HeaderController)
    .name;