import * as angular from 'angular';
import HeaderComponent from './HeaderComponent';
import HeaderController from './HeaderController';

export default angular
    .module('core.header', [])
    .component('krossrHeader', HeaderComponent)
    .controller(HeaderController.$name, HeaderController)
    .name;