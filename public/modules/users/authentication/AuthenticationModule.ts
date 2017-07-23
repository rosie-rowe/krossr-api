import * as angular from 'angular';
import AuthenticationService from './AuthenticationService';

export default angular
    .module('users.authentication')
    .service('Authentication', AuthenticationService)
    .name;