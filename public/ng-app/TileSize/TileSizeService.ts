import { Injectable } from "@angular/core";
import { TileSizeEventService } from "./TileSizeEventService";

@Injectable({
    providedIn: 'root'
})
export class TileSizeService {
    static $name = 'tileSizeService';

    private tileSize: number = 25;

    constructor(
        private tileSizeEventService: TileSizeEventService
    ) {
    }

    getTileSize() {
        return this.tileSize;
    }

    getTileSizePx() {
        return this.getTileSize()  + 'px'
    }

    setTileSize(gameWidth, widthInTiles) {
        this.tileSize = gameWidth / parseInt(widthInTiles, 10);
        this.tileSizeEventService.tileSizeChanged.emit(this.tileSize);
    }
}