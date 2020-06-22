import { AuthenticationService } from '../Authentication/AuthenticationService'
import { ILevel } from "../level/Level";
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelService } from './LevelService';
import { ShiftService } from '../Shift/ShiftService';
import { Utils } from '../Utils/Utils';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { LevelParams } from './LevelParams';
import { Input, Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';

@Component({
    selector: 'level',
    styles: [require('./LevelStyles.less')],
    template: require('./LevelView.html')
})
export class LevelComponent implements OnInit {
    static $name = 'level';
    bindToController = true;
    controller = 'LevelController';
    controllerAs = 'levelCtrl';
    templateUrl = 'modules/levels/level/LevelView.html';

    private finalLayout: any = {};

    constructor(
        private $state: StateService,
        private Authentication: AuthenticationService,
        private gameSizeService: GameSizeService,
        private levelService: LevelService,
        private matDialog: MatDialog,
        private ratingService: RatingService,
        private shiftService: ShiftService,
        private tileSizeEventService: TileSizeEventService,
        private Utils: Utils
    ) {
    }

    @Input() public mode: string; // string for edit, new, etc.
    private level: ILevel;
    private margin: string;
    private selectedLevelId;
    @Input() public levelId;
    private error;
    private timeout = 1000;

    private gameMatrix: GameMatrix;
    private goalMatrix: GameMatrix;

    ngOnInit() {
        this.selectedLevelId = this.levelId;
        this.findOne(this.mode);

        this.tileSizeEventService.tileSizeChanged.subscribe(tileSize => {
            let newSize = Math.floor(tileSize);
            this.margin = newSize / 2 + 'px';
        });
    }

    confirmUpdate(level: ILevel) {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Update',
                submitAction: () => this.updateLevel(level)
            } as ConfirmationOptions,
            disableClose: true
        })
    };

     /** Create new Level (submit function) */
    create(level, successFunc: Function, failFunc: Function) {
        // Redirect after save
        this.levelService.createLevel(level).then(response => {
            successFunc(response);
        }).catch(response => {
            failFunc(response);
        });
    }

    createGameArray(action: string) {
        this.Utils.createNewGame({
            numberOfTiles: this.level ? this.level.size : 25,
            controller: this.level ? this.level.currentView : 'new'
        });

        this.getLayoutForRepeater(action);
    }

    // Create new level (load template)
    createNewLevel() {
        var action: 'new' = 'new';
        let name = '';

        if (this.level) {
            name = this.level.name;
        }

        this.Utils.clearAll();

        this.level = undefined;

        this.createGameArray(action);

        this.level = {
            currentView: action,
            ready: true,
            name,
            size: 25
        };

        this.gameMatrix = new GameMatrix(this.Utils.getGameMatrix(), false);
    }

    // Find existing Level
    findOne(mode) {
        this.finalLayout = {};
        this.level = null;

        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;

        if (this.selectedLevelId) {
            this.levelService.getLevel(this.selectedLevelId).then((data: ILevel) => {
                this.level = data;
                
                this.setRating();

                this.level.layout = this.levelService.decodeLayout(data.layout);

                var flatLayout = this.Utils.flatten(this.level.layout);

                this.gameSizeService.calculatePlayableArea();

                this.Utils.createNewGame({
                    numberOfTiles: flatLayout.length,
                    layout: this.level.layout,
                    controller: mode
                });

                this.gameMatrix = new GameMatrix(this.Utils.getGameMatrix(), mode == 'edit');

                let goalLayout = this.Utils.getGoalMatrix();

                if (goalLayout) {
                    this.goalMatrix = new GameMatrix(goalLayout, true);
                }

                this.getLayoutForRepeater(mode, this.level.layout);
                this.level.currentView = mode;

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
    
    rate(rating) {
        setTimeout(() => {
            this.ratingService.rate(this.level.id, rating);
        });
    }


    /** This should be done on the server side, todo */
    setRating() {
        if (this.level.ratings && this.level.ratings.length) {
            this.level.yourRating = this.level.ratings[0].rating;
        }
    }

    // Split out for easier testing
    submitCreate() {
        // Create new Level object
        var level = {
            name: this.level.name,
            layout: this.gameMatrix.horizontal.getLayout(),
            size: this.gameMatrix.horizontal.length
        } as LevelParams;

        var levelSaveSuccess = (response) => {
            this.$state.go('update-level', { levelId: response.id }, { reload: true });
        };

        var levelSaveFailure = (err) => {
            this.error = err.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout)
        }

        this.create(level, levelSaveSuccess, levelSaveFailure);
    }

    updateLevel(level) {
        level.size = level.layout.length;

        this.levelService.updateLevel(level).then(() => {
            this.$state.go('update-level', { levelId: level.id }, { reload: true }); 
        }).catch(response => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        })
    }
}