import angular from 'angular';
import ResetPasswordComponent from './ResetPasswordComponent';
import ResetPasswordController from './ResetPasswordController';

export default angular
    .module('users.resetPassword', [])
    .component(ResetPasswordComponent.$name, new ResetPasswordComponent())
    .controller(ResetPasswordController.$name, ResetPasswordController)
    .name;
