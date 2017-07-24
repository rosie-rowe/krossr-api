import * as angular from 'angular';
import ComponentDialogController from './ComponentDialogController';
import { ComponentDialogService } from './ComponentDialogService';

export default angular
    .module('core.componentDialog', [])
    .controller(ComponentDialogController.$name, ComponentDialogController)
    .service(ComponentDialogService.$name, ComponentDialogService)
    .name;