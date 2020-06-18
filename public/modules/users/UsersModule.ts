import * as angular from 'angular';

import ForgotPasswordModule from './forgotPassword/ForgotPasswordModule';
import ResetPasswordModule from './resetPassword/ResetPasswordModule';
import SignUpModule from './signUp/SignUpModule';

import { errorHandler } from './config/ErrorHandler';
import { routing } from './config/RouteModule';

export default angular
    .module('users', [
        ForgotPasswordModule,
        ResetPasswordModule,
        SignUpModule,
    ])
    .config(['$httpProvider', ($httpProvider) => errorHandler($httpProvider)])
    .config(['$stateProvider', ($stateProvider) => routing($stateProvider)])
    .name;