'use strict';

class TileComponent implements angular.IComponentOptions {
    static $name = 'tile';
    bindToController = true;
    controller = 'TileController';
    controllerAs = 'tileCtrl';
    templateUrl = 'modules/levels/tile/TileView.html';

    bindings = {
        index: '<',
        fillTiles: '&',
        gameOver: '&',
        level: '<'
    }
}

angular.module('levels').component(TileComponent.$name, new TileComponent());