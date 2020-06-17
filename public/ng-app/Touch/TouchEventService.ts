import { EventEmitter, Injectable } from "@angular/core";

/** For some godforsaken reason, HTML doesn't support touchenter events natively, or carry touchmove events over element boundaires... so we'll make our own. With blackjack. And hookers. */
@Injectable({
    providedIn: 'root'
})
export class TouchEventService {
    public boundaryCrossingTouchMove: EventEmitter<HTMLElement> = new EventEmitter();
}