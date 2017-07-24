import * as angular from 'angular';
import { NumberLineComponent } from './NumberLineComponent';
import { NumberLineController } from './NumberLineController';

export default angular
    .module('levels.numberLine', [])
    .component(NumberLineComponent.$name, new NumberLineComponent())
    .controller(NumberLineController.$name, NumberLineController)
    .name;