import { IUtils } from '../utils/IUtils';

import { BooleanMatrix } from '../matrix/BooleanMatrix'
import { EventService } from '../../core/eventService/EventService';

'use strict';

export default class NumberGridController implements angular.IComponentController {
    static $name = 'NumberGridController';

    static $inject = [
        '$scope',
        'eventService',
        'Utils'
    ];

    constructor(
        private $scope: angular.IScope,
        private eventService: EventService,
        private Utils: IUtils
    ) {

    }

    /** The top row is considered vertical because the numbers go from top to bottom */
    private isVertical: boolean;

    // At this level and below we're working with the individual rotated pieces, not the full thing
    private gameMatrix: BooleanMatrix;
    private goalMatrix: BooleanMatrix;

    private orientation: string;

    private tileSize: string;

    $onInit() {
        this.isVertical = this.orientation === 'vertical';
        this.setTileSize();
    }

    $postLink() {
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', () => {
            this.setTileSize();
        });
    }

    private setTileSize() {
        this.tileSize = this.Utils.getTileSizePx();
    }

    getFontSize() {
        return parseInt(this.tileSize, 10) / 2 + 'px';
    }
}