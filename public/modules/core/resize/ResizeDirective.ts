/// <reference path="../../levels/utils/Utils.d.ts" />

'use strict';

class ResizeDirective implements angular.IDirective {
    static $name = 'resize';

    static $inject = [
        '$window',
        'debounce',
        'Utils'
    ]

    constructor(
        private $window: angular.IWindowService,
        private debounce,
        private Utils: IUtils
    ) {
        
    }

    link = (scope) => {
        var gameMatrix;

        angular.element(this.$window).on('resize', this.debounce(() => {
            gameMatrix = this.Utils.getGameMatrix();

            if (gameMatrix) {
                this.Utils.calculatePlayableArea();
                console.log('resize event with length: ' + gameMatrix.length);
                this.Utils.setGameSize(gameMatrix.length);
                scope.$apply();
            }
        }, 250));
    }
}

angular.module('core').directive(ResizeDirective.$name, ($window, debounce, Utils) => { return new ResizeDirective($window, debounce, Utils); });