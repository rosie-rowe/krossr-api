import * as angular from 'angular';

import GameModule from './game/GameModule';
import GameOverModule from './gameOver/GameOverModule';
import GameSizeModule from './gameSize/GameSizeModule';
import LevelModule from './level/LevelModule';
import LevelSelectModule from './levelSelect/LevelSelectModule';
import ModeSelectorModule from './modeSelector/ModeSelectorModule';
import NumberGridModule from './numberGrid/NumberGridModule';
import NumberLineModule from './numberLine/NumberLineModule';
import ShellModule from './shell/ShellModule';
import StarRatingModule from './starRating/StarRatingModule';
import TileModule from './tile/TileModule';
import TileSizeModule from './tileSize/TileSizeModule';
import UtilsModule from './utils/UtilsModule';

import { LevelsRoutes } from './config/RouteModule';

export default angular
    .module('levels', [
        GameModule,
        GameOverModule,
        GameSizeModule,
        LevelModule,
        LevelSelectModule,
        ModeSelectorModule,
        NumberGridModule,
        NumberLineModule,
        ShellModule,
        StarRatingModule,
        TileModule,
        TileSizeModule,
        UtilsModule
    ])
    .config(LevelsRoutes.route)
    .name;