import * as angular from 'angular';
import ShellComponent from './ShellComponent';
import ShellController from './ShellController';

export default angular
    .module('levels.shell', [])
    .component(ShellComponent.$name, new ShellComponent())
    .controller(ShellController.$name, ShellController)
    .name;