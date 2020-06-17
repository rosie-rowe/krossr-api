import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TileEventService {
    public static $name = 'tileEventService';
    public tileDragEnd: EventEmitter<void> = new EventEmitter();
}