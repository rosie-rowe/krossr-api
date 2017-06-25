/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../../core/eventService/EventService.d.ts" />
/// <reference path="../shiftService/ShiftService.d.ts" />

'use strict';

class TileController implements angular.IComponentController {
    static $controllerAs = 'tileCtrl';
    static $name = 'TileController';

    static $inject = [
        '$attrs',
        '$element',
        '$scope',
        'Utils',
        'dragBoxService',
        'eventService',
        'shiftService',
        'touchService'
    ];

    private index;

    private ctrl; //MainController, todo
    private level;

    private editable;

    private fillTiles: Function;
    private gameOver: Function;

    private marked: boolean;
    private pending: boolean;
    private selected: boolean;

    private sideLength;
    private goalMatrix;

    private height: string;
    private width: string;

    private tiles;

    private tutorial;

    constructor(
        private $attrs: angular.IAttributes,
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private Utils: IUtils, 
        private dragBoxService,
        private eventService: IEventService,
        private shiftService: IShiftService,
        private touchService
    ) {
       
    }

    $onInit() {
        this.editable = this.$attrs['editable'];
        this.tutorial = this.$attrs['tutorial'];

        this.sideLength = this.Utils.getSideLength();
        this.goalMatrix = this.Utils.getGoalMatrix();

        this.fill('empty');

        if (this.level.currentView === 'edit'
            && this.tiles
            && this.tiles[this.$scope.$index]
            && this.tiles[this.$scope.$index].selected
        ) {
          this.fill('selected');
        } else {
          this.fill('empty');
        }
    }

    $postLink() {
        this.setTileSize(this.Utils.getTileSize(this.tutorial));
        this.Utils.addTileToIndex({ tileCtrl: this });

        this.$element.on('mousedown', (e) => this.mouseDownEvent(e));
        this.$element.on('mousemove', (e) => this.mouseMoveEvent(e));
        this.$element.on('mouseup', (e) => this.mouseUpEvent(e));

        this.$element.on('touchstart', (e) => {
            e.preventDefault();
            this.mouseDownEvent(e);
        });

        this.$element.on('touchmove', (e) => {
            e.preventDefault();
            this.mouseMoveEvent(e);
        });

        this.$element.on('touchend', (e) => {
            e.preventDefault();
            this.mouseUpEvent(e);
        })

        this.eventService.subscribe(this.$scope, 'tileSizeChanged', () => {
            this.sideLength = this.Utils.getSideLength();
            this.setTileSize(this.Utils.getTileSize(this.tutorial));
        })
    }

    private clearPending(coords) {
        this.fillTiles(coords, true, 'empty', 'isPendingAndNotSelected');
    }

    /** If the override value (which will be the value of the tile that a dragstart is activated on)
     *  is present, use that for all tiles being considered.
     *  This is so you don't unselect previously selected tiles if your drags overlap
     */
    private checkForOverride(override, value) {
        if (typeof override !== 'undefined') {
            return !override;
        } else {
            return !value;
        }
    }

    private fillPending(index) {
        var coord = this.Utils.convertTo2D(index),
                    coordsToClear,
                    i = 0,
                    len,
                    currentCoord,
                    currentTileController;

        // save a snapshot of the previous dragbox for comparison purposes
        var oldCoords = this.dragBoxService.process();

        // set the current coordinate to the new dragbox end and compute the new dragbox
        this.dragBoxService.endCoord = coord;
        
        var allPendingCoords = this.dragBoxService.process();

        // we should only clear the old coordinates off if the current selected area is
        // smaller than the previous selected area, for speed reasons
        if (allPendingCoords &&
            oldCoords &&
            allPendingCoords.length < oldCoords.length) {

            // more speed -- only clear the values that are present in
            // oldCoords but not allPendingCoords
            coordsToClear = oldCoords.filter(function(e) {
                if (allPendingCoords.indexOfObject(e) === -1) return true;
            });
            this.clearPending(coordsToClear);
        }

        this.fillTiles(allPendingCoords, true, 'pending', 'isNotPending');

        this.$scope.$apply(); 
    }

    private mouseDownEvent(event: JQueryEventObject) {
        let coord = this.Utils.convertTo2D(this.index);

        this.dragBoxService.startCoord = coord;
        this.dragBoxService.initState = this.selected;
    }

    private mouseMoveEvent(event: JQueryEventObject) {
        let actualScope = this.touchService.getTargetScope(event);

        if (actualScope && actualScope.tileCtrl.index) {
            if (this.dragBoxService.validateStart())  {
                this.fillPending(actualScope.tileCtrl.index);
            }
        }
    }

    private mouseUpEvent(event: JQueryEventObject) {
        let actualScope = this.touchService.getTargetScope(event);
        let coord;

        if (actualScope && actualScope.tileCtrl.hasOwnProperty('index')) {
            coord = this.Utils.convertTo2D(actualScope.tileCtrl.index);
            this.dragBoxService.endCoord = coord;

            if (!this.dragBoxService.validate()) {
                this.$scope.tileCtrl.change(coord);
            }
        }
    }

    change(index, initState, changeTo) {
        if (this.editable === 'true') {
            this.changeTile(this.$scope, index, initState, changeTo, this.goalMatrix);
        }
    }

    changeTile(scope, index, initState, changeTo, goalMatrix) {
        var coord,
            wrong_answer = false;
    
        if (typeof index === 'number') { 
            coord = this.Utils.convertTo2D(index);
        } else {
            coord = index;
        }
    
        if (typeof changeTo === "string") {
            this.fill(changeTo);
        } else {
            if (this.shiftService.shiftOn === true) {
                this.fill('marked', initState);
                this.Utils.setCoord(coord.y, coord.x, this.selected);
            } else {
                // we don't want this to happen for new or edit screens
                if (goalMatrix) {
                    wrong_answer = (goalMatrix[coord.y][coord.x] !== true)
                }
        
                if (wrong_answer) {
                    this.fill('marked');
                    this.removeLife();
                } else {
                    this.fill('selected', initState);
                    this.Utils.setCoord(coord.y, coord.x, this.selected);
                }
            }
        }
    }

    fill(fillType, override?) {
        switch (fillType) {
            case 'pending':
                this.pending = true;
                break;
            case 'marked':
                this.marked = this.checkForOverride(override, this.marked);
                this.selected = false;
                this.pending = false;
                break;
            case 'selected':
                this.selected = this.checkForOverride(override, this.selected);
                this.marked = false;
                this.pending = false;
                break;
            case 'empty':
                this.selected = false;
                this.marked = false;
                this.pending = false;
                break;
            default:
                console.log("you done goofed");
                break;
        }
    }

    fillBorders(direction, index) {
      return this.getBorderColors(this.sideLength, direction, index);
    }

    /* Determine which tiles to add colored borders to */
    getBorderColors(sideLength, direction, index) {
        var canColor,
            coord = this.Utils.convertTo2D(index);

        // no borders through puzzle for small puzzles
        if (sideLength <= 5) {
            return;
        }

        switch (direction) {
            case 'left':
                canColor = this.testTileForBorder(sideLength, coord.x);
                break;
            case 'right':
                canColor = this.testTileForBorder(sideLength, coord.x + 1);
                break;
            case 'bottom':
                canColor = this.testTileForBorder(sideLength, coord.y + 1);
                break;
            case 'top':
                canColor = this.testTileForBorder(sideLength, coord.y);
            default:
                break;
        }

        if (canColor) {
            return "1px solid #222"
        }
    }

    /** used with the validationFn in gameController.prototype.fillTiles */
    isPendingAndNotSelected() {
        return this.pending && !this.selected;
    }

    /** used with the validationFn in gameController.prototype.fillTiles */
    isNotPending() {
        return !this.pending;
    }

    /** Remove a life from the pool of remaining lives */
    removeLife() {
        if (this.level & this.level.currentLives) {
            this.level.currentLives--;

            if (this.level.currentLilves === 0) {
                this.gameOver();
            }
        }
    }

    /** We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
    testTileForBorder(sideLength, index) {
        return (index % 5 === 0
                && index % sideLength !== 0);
    };

    setTileSize(tileSize) {
        tileSize = Math.floor(tileSize);
        this.width = tileSize + 'px';
        this.height = tileSize + 'px';
    };
}

angular.module('levels').controller(TileController.$name, TileController);