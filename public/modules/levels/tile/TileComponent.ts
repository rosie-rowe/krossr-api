import TileController from './TileController';

'use strict';

export default function() {
    return {
        bindings: {
            gameMatrix: '<',
            index: '<',
            level: '<',
            tiles: '<'
        },
        bindToController: true,
        controller: TileController,
        controllerAs: TileController.$controllerAs,
        templateUrl: 'modules/levels/tile/TileView.html'
    }
}