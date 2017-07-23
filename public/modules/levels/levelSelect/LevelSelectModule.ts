import * as angular from 'angular';
import LevelSelectComponent from './LevelSelectComponent'
import LevelSelectController from './LevelSelectController'

export default angular
    .module('levels.levelSelect', [])
    .component(LevelSelectComponent.$name, new LevelSelectComponent())
    .controller(LevelSelectController.$name, LevelSelectController)
    .name;