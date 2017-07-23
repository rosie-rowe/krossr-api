import * as angular from 'angular';
import SignInComponent from './SignInComponent';
import SignInController from './SignInController';

export default angular
    .module('users.signIn', [])
    .component(SignInComponent.$name, new SignInComponent())
    .controller(SignInController.$name, SignInController)
    .name;