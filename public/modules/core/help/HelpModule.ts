import * as angular from 'angular';
import HelpComponent from './HelpComponent';

export default angular
    .module('core.help', [])
    .component(HelpComponent.$name, new HelpComponent())
    .name;