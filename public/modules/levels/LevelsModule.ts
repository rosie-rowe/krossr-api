import * as angular from 'angular';

import LevelModule from './level/LevelModule';
import ShellModule from './shell/ShellModule';

import { LevelsRoutes } from './config/RouteModule';

export default angular
    .module('levels', [
        LevelModule,
        ShellModule
    ])
    .config(['$stateProvider', ($stateProvider) => LevelsRoutes.route($stateProvider)])
    .name;