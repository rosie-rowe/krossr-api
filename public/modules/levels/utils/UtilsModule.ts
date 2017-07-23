import angular from 'angular';
import Utils from './Utils';

export default angular
    .module('levels.utils', [])
    .service(Utils.$name, Utils)
    .name;