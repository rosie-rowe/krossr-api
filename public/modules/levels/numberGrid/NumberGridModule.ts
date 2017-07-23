import * as angular from 'angular';
import NumberGridComponent from './NumberGridComponent';
import NumberGridController from './NumberGridController';

export default angular
    .module('levels.numberGrid', [])
    .component('numberGrid', NumberGridComponent)
    .controller(NumberGridController.$name, NumberGridController)
    .name;