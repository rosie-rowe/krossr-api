import angular from 'angular';
import NumberGridComponent from './NumberGridComponent';
import NumberGridController from './NumberGridController';

export default angular
    .module('levels.numberGrid', [])
    .component(NumberGridComponent.$name, new NumberGridComponent())
    .controller(NumberGridController.$name, NumberGridController)
    .name;