import * as angular from 'angular';
import { usersService } from './UsersService';

export default angular
    .module('users.usersService', [])
    .factory('Users', usersService)
    .name