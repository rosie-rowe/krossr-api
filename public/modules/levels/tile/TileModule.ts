import angular from 'angular';
import TileComponent from './TileComponent';
import TileController from './TileController';
import TileService from './TileService';

export default angular
    .module('levels.tile', [])
    .component(TileComponent.$name, new TileComponent())
    .controller(TileController.$name, TileController)
    .service(TileService.$name, TileService)
    .name;