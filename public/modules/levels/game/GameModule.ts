import * as angular from 'angular';
import GameComponent from './GameComponent';
import GameController from './GameController'

export default angular
    .module('levels.game', [])
    .component(GameComponent.$name, new GameComponent())
    .controller(GameController.$name, GameController)
    .name;