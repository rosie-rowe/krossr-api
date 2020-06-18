import * as angular from 'angular';

import SignUpModule from './signUp/SignUpModule';

import { errorHandler } from './config/ErrorHandler';
import { routing } from './config/RouteModule';

export default angular
    .module('users', [
        SignUpModule,
    ])
    .config(['$httpProvider', ($httpProvider) => errorHandler($httpProvider)])
    .config(['$stateProvider', ($stateProvider) => routing($stateProvider)])
    .name;