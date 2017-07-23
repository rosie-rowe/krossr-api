import * as angular from 'angular';
import ConfirmationComponent from './ConfirmationComponent';
import ConfirmationController from './ConfirmationController';

export default angular
    .module('core.confirmation', [])
    .component('confirmation', ConfirmationComponent)
    .controller(ConfirmationController.$name, ConfirmationController)
    .name;