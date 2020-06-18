import * as angular from 'angular';

import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';
import ResizeModule from './resize/ResizeModule';

import { routing } from './config/RouteModule';

export default angular
    .module('core', [
        ConvertToNumberModule,
        ResizeModule
    ])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => routing($stateProvider, $urlRouterProvider)])
    .name;