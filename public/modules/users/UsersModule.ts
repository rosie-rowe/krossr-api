import * as angular from 'angular';

import { errorHandler } from './config/ErrorHandler';
import { routing } from './config/RouteModule';

export default angular
    .module('users', [])
    .config(['$httpProvider', ($httpProvider) => errorHandler($httpProvider)])
    .config(['$stateProvider', ($stateProvider) => routing($stateProvider)])
    .name;