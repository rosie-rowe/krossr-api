import * as angular from 'angular';
import SignUpComponent from './SignUpComponent';
import SignUpController from './SignUpController';

export default angular
    .module('users.signUp', [])
    .component('signUp', SignUpComponent)
    .controller(SignUpController.$name, SignUpController)
    .name;