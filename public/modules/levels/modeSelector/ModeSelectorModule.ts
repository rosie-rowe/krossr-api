import * as angular from 'angular';
import { ModeSelectorComponent } from './ModeSelectorComponent';
import { ModeSelectorController } from './ModeSelectorController';

export default angular
    .module('levels.modeSelector', [])
    .component(ModeSelectorComponent.$name, new ModeSelectorComponent())
    .controller(ModeSelectorController.$name, ModeSelectorController)
    .name;