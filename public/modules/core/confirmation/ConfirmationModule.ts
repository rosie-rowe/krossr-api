import angular from 'angular';
import ConfirmationComponent from './ConfirmationComponent';
import ConfirmationController from './ConfirmationController';

export default angular
    .module('core.confirmation', [])
    .component(ConfirmationComponent.$name, new ConfirmationComponent())
    .controller(ConfirmationController.$name, ConfirmationController)
    .name;