export class TileComponent implements angular.IComponentOptions {
    static $name = 'tile';
    bindToController = true;
    controller = 'TileController';
    controllerAs = 'tileCtrl';
    templateUrl = 'modules/levels/tile/TileView.html';

    bindings = {
        gameMatrix: '<',
        index: '<',
        level: '<',
        tiles: '<'
    }
}