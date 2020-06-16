import { BooleanMatrix } from '../matrix/BooleanMatrix';
import { DragBoxService } from '../dragBox/DragBoxService';
import { EventService } from '../../core/eventService/EventService';
import { GameOverService } from '../gameOver/GameOverService';
import { ILevel } from "../level/Level";
import { ShiftService } from '../shiftService/ShiftService';
import { Point } from '../point/Point';
import { SideLengthService } from '../sideLengthService/SideLengthService';
import { TileService } from '../tile/TileService';
import { TileSizeService } from '../tileSize/TileSizeService';
import { TileState } from './TileState';
import { TouchService } from '../../../ng-app/Touch/TouchService';
import { Utils } from '../utils/Utils';

'use strict';

export class TileController implements angular.IComponentController {
    static $controllerAs = 'tileCtrl';
    static $name = 'TileController';

    static $inject = [
        '$attrs',
        '$element',
        '$scope',
        'Utils',
        'dragBoxService',
        'eventService',
        'gameOverService',
        'shiftService',
        'sideLengthService',
        'tileService',
        'tileSizeService',
        'touchService'
    ];

    /* At this level, work with the horizontal version only */
    private gameMatrix: BooleanMatrix;

    private index;
    private isEditMode: boolean;

    private level: ILevel;

    private editable;

    private marked: boolean;
    private pending: boolean;
    private selected: boolean;

    private goalMatrix;

    private height: string;
    private width: string;

    private tiles;

    constructor(
        private $attrs: angular.IAttributes,
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private Utils: Utils, 
        private dragBoxService: DragBoxService,
        private eventService: EventService,
        private gameOverService: GameOverService,
        private shiftService: ShiftService,
        private sideLengthService: SideLengthService,
        private tileService: TileService,
        private tileSizeService: TileSizeService,
        private touchService: TouchService
    ) {
       
    }

    $onInit() {
        this.editable = this.$attrs['editable'];
        this.isEditMode = this.level.currentView === 'edit';

        this.goalMatrix = this.Utils.getGoalMatrix();

        this.initializeFill();
    }

    $postLink() {
        this.setTileSize(this.tileSizeService.getTileSize());
        this.tileService.addTile({ tileCtrl: this });

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
            this.setTileSize(this.tileSizeService.getTileSize());
        })
    }

    private clearPending(coords: Point[]) {
        this.tileService.fillTiles(coords, true, TileState.empty, 'isPendingAndNotSelected');
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

    /**
     * Determine the initial state of the tile fills
     */
    private initializeFill() {
        if (this.isEditMode && this.tiles && this.tiles[this.index] && this.tiles[this.index].selected) {
            this.fill(TileState.selected);
        } else {
            this.fill(TileState.empty);
        }
    }

    private fillPending(index) {
        var coord = this.tileService.convertTo2D(index),
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

        this.tileService.fillTiles(allPendingCoords, true, TileState.pending,'isNotPending');

        this.$scope.$apply(); 
    }

    private mouseDownEvent(event: JQueryEventObject) {
        let coord = this.tileService.convertTo2D(this.index);

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

    /*
    * This event bubbles up to GameController, which completes the job
    */
    private mouseUpEvent(event: JQueryEventObject) {
        let actualScope = this.touchService.getTargetScope(event);
        let coord;

        if (actualScope && actualScope.tileCtrl.hasOwnProperty('index')) {
            coord = this.tileService.convertTo2D(actualScope.tileCtrl.index);
            this.dragBoxService.endCoord = coord;
        }
    }

    change(index, initState, changeTo) {
        if (this.editable === 'true') {
            this.changeTile(index, initState, changeTo, this.goalMatrix);
        }
    }

    changeTile(index, initState, changeTo, goalMatrix) {
        var coord;

        if (typeof index === 'number') { 
            coord = this.tileService.convertTo2D(index);
        } else {
            coord = index;
        }
    
        if (changeTo in TileState) {
            this.fill(changeTo);
        } else {
            if (this.shiftService.shiftOn === true) {
                this.fill(this.marked ? TileState.empty : TileState.marked);
                
                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            } else {
                this.fill(this.selected ? TileState.empty : TileState.selected, initState);
                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            }
        }
    }

    fill(fillType, override?) {
        switch (fillType) {
            case TileState.pending:
                this.pending = true;
                break;
            case TileState.marked:
                this.marked = true;
                this.selected = false;
                this.pending = false;
                break;
            case TileState.selected:
                this.selected = this.checkForOverride(override, this.selected);
                this.marked = false;
                this.pending = false;
                break;
            case TileState.empty:
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
      return this.getBorderColors(direction, index);
    }

    /* Determine which tiles to add colored borders to */
    getBorderColors(direction, index) {
        let canColor;
        let coord = this.tileService.convertTo2D(index);
        let sideLength = this.sideLengthService.sideLength;

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

    /** used with the validationFn in tileService.fillTiles */
    isPendingAndNotSelected() {
        return this.pending && !this.selected;
    }

    /** used with the validationFn in tileService.fillTiles */
    isNotPending() {
        return !this.pending;
    }

    setTileSize(tileSize) {
        tileSize = Math.floor(tileSize);
        this.width = tileSize + 'px';
        this.height = tileSize + 'px';
    };

    /** We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
    testTileForBorder(sideLength, index) {
        return (index % 5 === 0
                && index % sideLength !== 0);
    };
}