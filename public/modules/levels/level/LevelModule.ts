import * as angular from 'angular';
import LevelComponent from './LevelComponent';
import LevelController from './LevelController';

export default angular
    .module('levels.level', [])
    .component(LevelComponent.$name, new LevelComponent())
    .controller(LevelController.$name, LevelController)
    .name;