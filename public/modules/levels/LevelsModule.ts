import * as angular from 'angular';

import GameModule from './game/GameModule';
import LevelModule from './level/LevelModule';
import LevelSelectModule from './levelSelect/LevelSelectModule';
import ShellModule from './shell/ShellModule';
import TileModule from './tile/TileModule';

import { LevelsRoutes } from './config/RouteModule';

export default angular
    .module('levels', [
        GameModule,
        LevelModule,
        LevelSelectModule,
        ShellModule,
        TileModule
    ])
    .config(['$stateProvider', ($stateProvider) => LevelsRoutes.route($stateProvider)])
    .name;