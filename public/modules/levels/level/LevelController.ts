/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../../core/eventService/EventService.d.ts" />

'use strict';

class LevelController implements angular.IComponentController {
    static $controllerAs = 'levelCtrl';
    static $name = 'LevelController';

    static $inject = [
        '$scope',
        '$stateParams',
        'Authentication',
        'eventService',
        'Levels',
        'Utils'
    ];

    constructor(
        private $scope: angular.IScope,
        private $stateParams: any,
        private Authentication: any,
        private eventService: IEventService,
        private Levels,
        private Utils: IUtils
    ) {
        
    }

    private ctrl; // MainController, todo
    private mode: string; // string for edit, new, etc.
    private level; // the level
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

    // Find existing Level
    findOne(mode) {
        if (this.ctrl) {
            this.ctrl.finalLayout = {};
        }

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

                if (this.ctrl) {
                    this.ctrl.getLayoutForRepeater(mode, this.level.layout);
                    this.level.currentView = mode;
                }

                console.log('At this point we should be on ' + mode);
                console.log('We are actually on ' + this.level.currentView);

                this.level.won = false;
                this.level.lost = false;
                this.level.ready = true;
            });
        }
    };
}

angular.module('levels').controller(LevelController.$name, LevelController);