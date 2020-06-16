import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TileSizeEventService {
    public static $name = 'tileSizeEventService';

    public tileSizeChanged: EventEmitter<number> = new EventEmitter();
}