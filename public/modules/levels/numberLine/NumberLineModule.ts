import * as angular from 'angular';
import NumberLineComponent from './NumberLineComponent';
import NumberLineController from './NumberLineController';

export default angular
    .module('levels.numberLine', [])
    .component('numberLine', NumberLineComponent)
    .controller(NumberLineController.$name, NumberLineController)
    .name;