import { ILevel } from "../../modules/levels/level/Level";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GameOverComponent } from "./GameOverComponent";

/** Open the Game Over popup */

@Injectable({
    providedIn: 'root'
})
export class GameOverService {
    static $name = 'gameOverService';

    constructor(
        private matDialog: MatDialog 
    ) {

    }

    openDialog(level: ILevel): void {
        this.matDialog.open(GameOverComponent, {
            data: {
                levelId: level.id,
                won: level.won
            },
            disableClose: true
        });
    }
}