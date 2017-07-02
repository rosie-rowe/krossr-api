import { IUtils } from '../utils/IUtils';
import { IComponentDialogService } from '../../core/componentDialog/IComponentDialogService';
import { IEventService } from '../../core/event/IEventService';
/// <reference path="../shiftService/ShiftService.d.ts" />
import { IAuthenticationService } from '../../users/authentication/IAuthenticationService'

import * as angular from 'angular';
import { GameMatrix } from '../gameMatrix/GameMatrix';

'use strict';

class LevelController implements angular.IComponentController {
    static $controllerAs = 'levelCtrl';
    static $name = 'LevelController';

    static $inject = [
        '$http',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        'Authentication',
        'componentDialogService',
        'eventService',
        'Levels',
        'ngDialog',
        'shiftService',
        'Utils'
    ];

    private finalLayout: any = {};

    private options = {
        size: 25
    };

    constructor(
        private $http: angular.IHttpService,
        private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $stateParams: any,
        private $timeout: angular.ITimeoutService,
        private Authentication: IAuthenticationService,
        private componentDialogService: IComponentDialogService,
        private eventService: IEventService,
        private Levels,
        private ngDialog,
        private shiftService: IShiftService,
        private Utils: IUtils
    ) {
        
    }

    private mode: string; // string for edit, new, etc.
    private level; // the level
    private margin: number;
    private selectedLevelId;
    private error;
    private timeout = 1000;

    private gameMatrix: GameMatrix;
    private goalMatrix: GameMatrix;

    $onInit() {
        this.selectedLevelId = this.$stateParams['levelId'];
        this.mode = this.$stateParams.mode;
        this.findOne(this.mode);
    }

    $postLink() {
        this.eventService.subscribe(this.$scope, 'level.clearAll', () => {
            this.clearAll();
        });

        this.eventService.subscribe(this.$scope, 'tileSizeChanged', (e, args) => {
            let newSize = Math.floor(args);
            this.margin = newSize / 2;
        });
    }

    clearAll() {
        this.Utils.clearAll();
    }

    confirmClear() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: `<confirmation
                        cancel-action="closeThisDialog()"
                        confirm-action="confirm()"
                        submit-action="levelCtrl.clearAll()"
                        submit-text="Clear"></confirmation>`
        });
    };

    confirmRemove() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: `<confirmation
                        cancel-action="closeThisDialog()"
                        confirm-action="confirm()"
                        submit-action="levelCtrl.removeCurrentLevel()"
                        submit-text="Delete"></confirmation>`
        });
    };

    confirmUpdate() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: `<confirmation
                        cancel-action="closeThisDialog()"
                        confirm-action="confirm()"
                        submit-action="levelCtrl.update()"
                        submit-text="Update"></confirmation>`
        });
    };

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

    createGameArray(controller) {
        this.Utils.createNewGame({
            numberOfTiles: this.options.size,
            controller: controller
        });
    }

    // Create new level (load template)
    createNewLevel() {
        var action = 'new';
        var oldLevel = angular.copy(this.level);

        this.clearAll()

        this.level = undefined;

        this.createGameArray(action);
        this.getLayoutForRepeater(action);

        this.level = {
            currentView: action,
            ready: true,
            name: oldLevel ? oldLevel.name : '',
            lives: oldLevel ? oldLevel.lives : undefined
        };
    }

    // Find existing Level
    findOne(mode) {
        this.finalLayout = {};
        this.level = null;

        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;

        if (this.selectedLevelId) {
            this.Levels.get({ 
                levelId: this.selectedLevelId
            }).$promise.then((data) => {
                this.level = data;
                
                this.setRating();

                this.level.currentLives = data.lives;

                var flatLayout = this.Utils.flatten(data.layout);

                this.Utils.calculatePlayableArea();

                this.Utils.createNewGame({
                    numberOfTiles: flatLayout.length,
                    layout: this.level.layout,
                    controller: mode
                });

                this.gameMatrix = new GameMatrix(this.Utils.getGameMatrix(), false);
                this.goalMatrix = new GameMatrix(this.Utils.getGoalMatrix(), true);

                this.getLayoutForRepeater(mode, this.level.layout);
                this.level.currentView = mode;

                this.level.won = false;
                this.level.lost = false;
                this.level.ready = true;
            });
        } else {
            this.createNewLevel();
        }
    }

    getLayoutForRepeater(mode, layout?) {
        // use finalLayout from above to prevent calculating this more than once 
        let layoutForRepeater;

        switch(mode) {
            case 'view':
            case 'edit':
                layoutForRepeater = this.Utils.flatten(layout);
                break;

            case 'new':
                layoutForRepeater = this.getSize();
                break;
        }

        // these should be an object so i don't have to track by $index, which causes rendering issues
        this.finalLayout.tiles = layoutForRepeater.map((value) => {
            return {
                selected: value
            };
        });
    }

    getSize() {
        let gameMatrix = this.Utils.getGameMatrix();
        return gameMatrix.flatten();
    }

    keydown($event: JQueryEventObject) {
        if ($event.shiftKey) {
            this.shiftService.shiftOn = true;
        }
    }

    keyup($event: JQueryEventObject) {
        if (!$event.shiftKey) {
            this.shiftService.shiftOn = false;
        }
    }
    
    /* Doing this old school until I figure out a better way */
    rate() {
        this.$timeout(() => {
            var url = '/levels/' + this.level.id + '/ratings';

            var post_data = {
                rating: this.level.yourRating
            };

            this.$http.post(url, post_data).then(function() {
                console.log('omg');
            });
        });
    }

     /** Remove any Level passed in */
    remove(level) {
        if (level) { 
            level.$remove(() => {
                this.componentDialogService.open('level-select');
            });
        }
    }

    /** Remove the level you're looking at */
    removeCurrentLevel() {
        this.remove(this.level);
    }

    /** This should be done on the server side, todo */
    setRating() {
        if (this.level.ratings.length) {
            this.level.yourRating = this.level.ratings[0].rating;
        }
    }

    // Split out for easier testing
    submitCreate() {
        var gameMatrix = this.Utils.getGameMatrix();

        // Create new Level object
        var level = new this.Levels ({
            name: this.level.name,
            layout: gameMatrix.getLayout(),
            lives: this.level.lives,
            size: gameMatrix.length
        });

        var levelSaveSuccess = (response) => {
            this.$state.go('update-level', { levelId: response.id }, { reload: true });
        };

        var levelSaveFailure = (err) => {
            this.error = err.data.message;

            this.$timeout(() => {
                this.error = '';
            }, this.timeout)
        }

        this.create(level, levelSaveSuccess, levelSaveFailure);
    }

    // Update existing Level
    update() {
        this.updateLevel(this.level);
    };

    updateLevel(level) {
        level.size = level.layout.length;

        level.$update(() => {
           this.$state.go('update-level', { levelId: level.id }, { reload: true }); 
        }, function(errorResponse) {
            this.error = errorResponse.data.message;

            this.$timeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}

angular.module('levels').controller(LevelController.$name, LevelController);