import { ResizeEventService } from "../Resize/ResizeEventService";
import { GameSizeService } from "./GameSizeService";
import { Utils } from "../Utils/Utils";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GameResizeService {
    constructor(
        private gameSizeService: GameSizeService,
        private resizeEventService: ResizeEventService,
        private utils: Utils
    ) {
    }

    initialize() {
        this.resizeEventService.windowResized.subscribe(() => {
            let gameMatrix = this.utils.getGameMatrix();

            if (gameMatrix) {
                this.gameSizeService.calculatePlayableArea();
                this.gameSizeService.setGameSize(gameMatrix.length);
            }
        });
    }
}