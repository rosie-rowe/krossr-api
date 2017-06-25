'use strict';

class TileComponent implements angular.IComponentOptions {
    static $name = 'tile';
    bindToController = true;
    controller = 'TileController';
    controllerAs = 'tileCtrl';
    templateUrl = 'modules/levels/tile/TileView.html';

    bindings = {
        index: '<',
        level: '<',
        tiles: '<'
    }
}

angular.module('levels').component(TileComponent.$name, new TileComponent());