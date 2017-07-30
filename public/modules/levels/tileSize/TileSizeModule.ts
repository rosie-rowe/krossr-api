import * as angular from 'angular';
import { TileSizeService } from './TileSizeService';

export default angular
    .module('levels.tileSize', [])
    .service(TileSizeService.$name, TileSizeService)
    .name;