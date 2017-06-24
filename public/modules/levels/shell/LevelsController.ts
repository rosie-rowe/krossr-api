/// <reference path="../utils/Utils.d.ts" />

'use strict';

/** Levels controller */

class LevelsController implements angular.IComponentController {
    static $inject = [
        '$http',
        '$scope',
        '$timeout',
        '$location',
        'Authentication',
        'Levels',
        'ngDialog',
        'Utils'
    ]

    constructor(
        private $http: angular.IHttpService,
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService,
        private $location: angular.ILocationService,
        private Authentication: any,
        private Levels: any,
        private ngDialog: any,
        private Utils: IUtils 
    ) {
        this.authentication = Authentication;
    }

    private authentication;
    private controller;
    private controllerName = 'levels';
    private timeout = 1000;
    private level;

    /** Create new Level (submit function) */
    create(level, successFunc, failFunc) {
        // Redirect after save
        level.$save(function(response) {
            if (typeof successFunc === 'function') {
                successFunc(response);
            }
        }, function(errorResponse) {
            if (typeof failFunc === 'function') {
                failFunc(errorResponse);
            }
        });
    }

    confirmClear() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            template: 'modules/levels/views/clear-confirmation.client.view.html',
            showClose: false,
            scope: this.$scope
        });
    };

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

    // Split out for easier testing
    // submitCreate() {
    //     var layout = this.Utils.getGameMatrix();

    //     // Create new Level object
    //     var level = new this.Levels ({
    //         name: this.level.name,
    //         layout: layout,
    //         lives: this.level.lives,
    //         size: layout.length
    //     });

    //     var levelSaveSuccess = (response) => {
    //         this.loadLevel(response.id, 'edit');
    //     };

    //     var levelSaveFailure = function(err) {
    //         this.error = err.data.message;

    //         this.$timeout(function() {
    //             this.error = '';
    //         }, this.timeout)
    //     }

    //     this.create(level, levelSaveSuccess, levelSaveFailure);
    // }

    // Update existing Level
    update() {
        this.Utils.updateLevel(this.$scope);
    };
}