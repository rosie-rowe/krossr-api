import * as angular from 'angular';
import { GameSizeService } from '../../../ng-app/GameSize/GameSizeService';
import { Utils } from '../../../ng-app/Utils/Utils'

export class ResizeDirective implements angular.IDirective {
    static $name = 'resize';

    static $inject = [
        '$window',
        'debounce',
        'gameSizeService',
        'Utils'
    ]

    constructor(
        private $window: angular.IWindowService,
        private debounce,
        private gameSizeService: GameSizeService,
        private Utils: Utils
    ) {
        
    }

    link = (scope) => {
        var gameMatrix;

        angular.element(this.$window).on('resize', this.debounce(() => {
            gameMatrix = this.Utils.getGameMatrix();

            if (gameMatrix) {
                this.gameSizeService.calculatePlayableArea();
                this.gameSizeService.setGameSize(gameMatrix.length);
                scope.$apply();
            }
        }, 250));
    }
}