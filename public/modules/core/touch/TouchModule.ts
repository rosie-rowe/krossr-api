import angular from 'angular';
import TouchService from './TouchService';

export default angular
    .module('core.touch')
    .service(TouchService.$name, TouchService)
    .name;