import * as angular from 'angular';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ForgotPasswordController from './ForgotPasswordController';

export default angular
    .module('users.forgotPassword', [])
    .component('forgotPassword', ForgotPasswordComponent)
    .controller(ForgotPasswordController.$name, ForgotPasswordController)
    .name;