import * as angular from 'angular';

import LevelModule from './level/LevelModule';
import ShellModule from './shell/ShellModule';

export default angular
    .module('levels', [
        LevelModule,
        ShellModule
    ])
    .name;