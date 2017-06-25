/// <reference path="../utils/Utils.d.ts" />

'use strict';

/** Levels controller */

class LevelsController implements angular.IComponentController {
    static $inject = [
        '$scope',
        'ngDialog',
        'Utils'
    ]

    constructor(
        private $scope: angular.IScope,
        private ngDialog: any,
        private Utils: IUtils 
    ) {
    }

    confirmUpdate() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            template: 'modules/levels/views/update-confirmation.client.view.html',
            showClose: false,
            scope: this.$scope
        });
    };

    // Update existing Level
    update() {
        this.Utils.updateLevel(this.$scope);
    };
}