export class TileSizeService {
    static $name = 'tileSizeService';

    static $inject = [
        '$rootScope'
    ];

    private tileSize: number = 25;

    constructor(
        private $rootScope: angular.IRootScopeService
    ) {
    }

    getTileSize() {
        return this.tileSize;
    }

    getTileSizePx() {
        return this.getTileSize()  + 'px'
    }

    setTileSize(gameWidth, widthInTiles) {
        this.tileSize = gameWidth / parseInt(widthInTiles, 10);
        this.$rootScope.$broadcast('tileSizeChanged', this.tileSize);
    }
}