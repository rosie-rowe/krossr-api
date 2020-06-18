import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResizeEventService {
    windowResized: EventEmitter<void> = new EventEmitter();
}