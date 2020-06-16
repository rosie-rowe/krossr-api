import * as angular from 'angular';
import { TileComponent } from './TileComponent';
import { TileController } from './TileController';

export default angular
    .module('levels.tile', [])
    .component(TileComponent.$name, new TileComponent())
    .controller(TileController.$name, TileController)
    .name;