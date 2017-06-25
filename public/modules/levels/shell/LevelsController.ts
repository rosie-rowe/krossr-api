/// <reference path="../utils/Utils.d.ts" />

'use strict';

/** Levels controller */

class LevelsController implements angular.IComponentController {
    static $inject = [
        '$http',
        '$scope',
        '$location',
        'Authentication',
        'Levels',
        'ngDialog',
        'Utils'
    ]

    constructor(
        private $http: angular.IHttpService,
        private $scope: angular.IScope,
        private $location: angular.ILocationService,
        private Authentication: any,
        private Levels: any,
        private ngDialog: any,
        private Utils: IUtils 
    ) {
        this.authentication = Authentication;
    }

    private authentication;
    private level;

    confirmRemove() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            template: 'modules/levels/views/delete-confirmation.client.view.html',
            showClose: false,
            scope: this.$scope
        });
    };

    confirmUpdate() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            template: 'modules/levels/views/update-confirmation.client.view.html',
            showClose: false,
            scope: this.$scope
        });
    };

    // reloadLevel(action) {
    //     this.loadLevel(this.level.id, action);
    // };

    /** Remove existing Level */
    // remove(level) {
    //     if (level) { 
    //         level.$remove(function() {
    //             this.$location.path('levels');
    //         });

    //         for (var i in this.levels) {
    //             if (this.levels[i] === level ) {
    //                 this.levels.splice(i, 1);
    //             }
    //         }
    //     } else {
    //         this.level.$remove(function() {
    //             this.$location.path('levels');
    //         });
    //     }
    // };

    // Update existing Level
    update() {
        this.Utils.updateLevel(this.$scope);
    };
}