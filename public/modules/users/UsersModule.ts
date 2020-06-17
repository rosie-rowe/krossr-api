import * as angular from 'angular';

import ForgotPasswordModule from './forgotPassword/ForgotPasswordModule';
import ResetPasswordModule from './resetPassword/ResetPasswordModule';
import SignUpModule from './signUp/SignUpModule';
import UsersServiceModule from './usersService/UsersServiceModule';

import { errorHandler } from './config/ErrorHandler';
import { routing } from './config/RouteModule';

export default angular
    .module('users', [
        ForgotPasswordModule,
        ResetPasswordModule,
        SignUpModule,
        UsersServiceModule
    ])
    .config(['$httpProvider', ($httpProvider) => errorHandler($httpProvider)])
    .config(['$stateProvider', ($stateProvider) => routing($stateProvider)])
    .name;