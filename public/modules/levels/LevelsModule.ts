'use strict';

import * as angular from 'angular';

import DragBoxModule from './dragBox/DragBoxModule';
import GameModule from './game/GameModule';
import GameOverModule from './gameOver/GameOverModule';
import LevelModule from './level/LevelModule';
import LevelSelectModule from './levelSelect/LevelSelectModule';
import LevelsServiceModule from './levelsService/LevelsServiceModule';
import LifeMeterModule from './lifeMeter/LifeMeterModule';
import NumberGridModule from './numberGrid/NumberGridModule';
import NumberLineModule from './numberLine/NumberLineModule';
import ShellModule from './shell/ShellModule';
import ShiftServiceModule from './shiftService/ShiftServiceModule';
import StarRatingModule from './starRating/StarRatingModule';
import SideLengthServiceModule from './sideLengthService/SideLengthServiceModule';
import TileModule from './tile/TileModule';
import UtilsModule from './utils/UtilsModule';

import LevelsRoutes from './config/RouteModule';

export default angular
    .module('levels', [
        DragBoxModule,
        GameModule,
        GameOverModule,
        LevelModule,
        LevelSelectModule,
        LevelsServiceModule,
        LifeMeterModule,
        NumberGridModule,
        NumberLineModule,
        ShellModule,
        ShiftServiceModule,
        StarRatingModule,
        SideLengthServiceModule,
        TileModule,
        UtilsModule
    ])
    .config(LevelsRoutes.route)
    .name;