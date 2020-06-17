import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';

@Component({
    selector: 'game-over',
    template: require('./GameOverView.html')
})
export class GameOverComponent {
    constructor(
        private matDialogRef: MatDialogRef<GameOverComponent>,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { levelId: number }
    ) {
    }

    close() {
        this.matDialogRef.close();
    }

    newLevel() {
        this.matDialogRef.close();
        this.matDialog.open(LevelSelectComponent);
    }
}