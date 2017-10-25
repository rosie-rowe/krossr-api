import * as angular from 'angular';
import { LevelResource } from './LevelResource';

import { LevelComponent } from './LevelComponent';
import { LevelController } from './LevelController';
import { LevelService } from './LevelService';

export default angular
    .module('levels.level', [])
    .component(LevelComponent.$name, new LevelComponent())
    .controller(LevelController.$name, LevelController)
    .factory('Levels', LevelResource)
    .service(LevelService.$name, LevelService)
    .name;