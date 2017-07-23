import angular from 'angular';
import { levelsResource } from './LevelsService';

export default angular
    .module('levels.levelsService', [])
    .factory('Levels', levelsResource)
    .name;