import * as angular from 'angular';

import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';

import { routing } from './config/RouteModule';

export default angular
    .module('core', [
        ConvertToNumberModule
    ])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => routing($stateProvider, $urlRouterProvider)])
    .name;