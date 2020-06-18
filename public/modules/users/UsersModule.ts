import * as angular from 'angular';

import { routing } from './config/RouteModule';

export default angular
    .module('users', [])
    .config(['$stateProvider', ($stateProvider) => routing($stateProvider)])
    .name;