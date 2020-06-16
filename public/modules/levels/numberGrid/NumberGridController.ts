import { BooleanMatrix } from '../matrix/BooleanMatrix'
import { TileSizeService } from '../../../ng-app/TileSize/TileSizeService';
import { TileSizeEventService } from '../../../ng-app/TileSize/TileSizeEventService';

export class NumberGridController implements angular.IComponentController {
    static $name = 'NumberGridController';

    static $inject = [
        TileSizeEventService.$name,
        'tileSizeService'
    ];

    constructor(
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService
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
        this.tileSizeEventService.tileSizeChanged.subscribe(() => {
            this.setTileSize();
        });
    }

    private setTileSize() {
        this.tileSize = this.tileSizeService.getTileSizePx();
    }

    getFontSize() {
        return parseInt(this.tileSize, 10) / 2 + 'px';
    }
}