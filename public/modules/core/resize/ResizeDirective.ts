import * as angular from 'angular';
import { Utils } from '../../levels/utils/Utils'

'use strict';

export default class ResizeDirective implements angular.IDirective {
    static $name = 'resize';

    static $inject = [
        '$window',
        'debounce',
        'Utils'
    ]

    constructor(
        private $window: angular.IWindowService,
        private debounce,
        private Utils: Utils
    ) {
        
    }

    link = (scope) => {
        var gameMatrix;

        angular.element(this.$window).on('resize', this.debounce(() => {
            gameMatrix = this.Utils.getGameMatrix();

            if (gameMatrix) {
                this.Utils.calculatePlayableArea();
                this.Utils.setGameSize(gameMatrix.length);
                scope.$apply();
            }
        }, 250));
    }
}