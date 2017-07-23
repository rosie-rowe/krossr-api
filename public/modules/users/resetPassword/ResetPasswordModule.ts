import * as angular from 'angular';
import ResetPasswordComponent from './ResetPasswordComponent';
import ResetPasswordController from './ResetPasswordController';

export default angular
    .module('users.resetPassword', [])
    .component('resetPassword', ResetPasswordComponent)
    .controller(ResetPasswordController.$name, ResetPasswordController)
    .name;
