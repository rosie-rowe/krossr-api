/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../../core/eventService/EventService.d.ts" />
/// <reference path="../shiftService/ShiftService.d.ts" />

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
        private Authentication: any,
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

    private clearLevel() {
        if (this.level) {
            this.level = null;
        }
    }

    clearAll() {
        this.Utils.clearAll();
        this.clearLevel();
    }

    confirmClear() {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            template: `<confirmation
                        cancel-action="closeThisDialog()"
                        confirm-action="confirm()"
                        submit-action="levelCtrl.clearAll()"
                        submit-text="Clear">`,
            plain: true,
            showClose: false,
            scope: this.$scope
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

        this.setGameSize(this.options.size)
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

                console.log('setting currentLives to: ' + data.lives);
                this.level.currentLives = data.lives;

                var flatLayout = this.Utils.flatten(data.layout);

                this.Utils.calculatePlayableArea();

                this.Utils.createNewGame({
                    numberOfTiles: flatLayout.length,
                    layout: this.level.layout,
                    controller: mode
                });

                this.getLayoutForRepeater(mode, this.level.layout);
                this.level.currentView = mode;

                console.log('At this point we should be on ' + mode);
                console.log('We are actually on ' + this.level.currentView);

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
        return this.Utils.flatten(this.Utils.getGameMatrix());
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
    };

    setGameSize(size) {
        this.Utils.setGameSize(Math.sqrt(size));
    }

    // Split out for easier testing
    submitCreate() {
        var layout = this.Utils.getGameMatrix();

        // Create new Level object
        var level = new this.Levels ({
            name: this.level.name,
            layout: layout,
            lives: this.level.lives,
            size: layout.length
        });

        var levelSaveSuccess = (response) => {
            this.$state.go('update-level', { levelId: response.id });
        };

        var levelSaveFailure = function(err) {
            this.error = err.data.message;

            this.$timeout(function() {
                this.error = '';
            }, this.timeout)
        }

        this.create(level, levelSaveSuccess, levelSaveFailure);
    }
}

angular.module('levels').controller(LevelController.$name, LevelController);