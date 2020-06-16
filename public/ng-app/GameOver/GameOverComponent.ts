import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'game-over',
    template: require('./GameOverView.html')
})
export class GameOverComponent {
    @Input() levelId: string;
    @Output() closeAction: EventEmitter<void> = new EventEmitter();
    @Input() won: boolean;

    constructor(
        private matDialogRef: MatDialogRef<GameOverComponent>
    ) {
    }

    close() {
        this.matDialogRef.close();
    }

    newLevel() {
        this.matDialogRef.close();
        // this.componentDialogService.open('level-select');
    }
}