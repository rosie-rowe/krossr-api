import * as angular from 'angular';

import GameModule from './game/GameModule';
import LevelModule from './level/LevelModule';
import LevelSelectModule from './levelSelect/LevelSelectModule';
import ModeSelectorModule from './modeSelector/ModeSelectorModule';
import NumberGridModule from './numberGrid/NumberGridModule';
import ShellModule from './shell/ShellModule';
import StarRatingModule from './starRating/StarRatingModule';
import TileModule from './tile/TileModule';

import { LevelsRoutes } from './config/RouteModule';

export default angular
    .module('levels', [
        GameModule,
        LevelModule,
        LevelSelectModule,
        ModeSelectorModule,
        NumberGridModule,
        ShellModule,
        StarRatingModule,
        TileModule
    ])
    .config(['$stateProvider', ($stateProvider) => LevelsRoutes.route($stateProvider)])
    .name;