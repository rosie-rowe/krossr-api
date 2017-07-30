import * as angular from 'angular';
import { GameSizeService } from './GameSizeService';

export default angular
    .module('levels.gameSize', [])
    .service(GameSizeService.$name, GameSizeService)
    .name;