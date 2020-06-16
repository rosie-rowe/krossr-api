import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GameSizeEventService {
    public static $name = 'gameSizeEventService';

    public gameSizeChanged: EventEmitter<void> = new EventEmitter();
}