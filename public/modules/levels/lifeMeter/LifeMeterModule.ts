import * as angular from 'angular';
import LifeMeterComponent from './LifeMeterComponent';
import LifeMeterController from './LifeMeterController';

export default angular
    .module('levels.lifeMeter', [])
    .component('lifeMeter', LifeMeterComponent)
    .controller(LifeMeterController.$name, LifeMeterController)
    .name;