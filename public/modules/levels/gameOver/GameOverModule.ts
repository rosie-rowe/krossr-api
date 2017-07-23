import * as angular from 'angular';
import GameOverComponent from './GameOverComponent';
import GameOverController from './GameOverController';
import GameOverService from './GameOverService';

export default angular
    .module('levels.gameOver', [])
    .component('gameOver', GameOverComponent)
    .controller(GameOverController.$name, GameOverController)
    .service(GameOverService.$name, GameOverService)
    .name;