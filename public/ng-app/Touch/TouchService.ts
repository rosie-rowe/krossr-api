import * as angular from 'angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TouchService {
    static $name = 'touchService';

    /** Touchmove/touchend will not move along with crossing over elements like mousemove/mouseup will, so we need hax */
    getRealTarget(event: JQueryEventObject): angular.IAugmentedJQuery {
        var myLocation = this.getTouches(event)[0];

        return angular.element(document.elementFromPoint(myLocation.clientX, myLocation.clientY)) as angular.IAugmentedJQuery;
    }

    /** Shortcut for getting actual target scope */
    getTargetScope(event: JQueryEventObject): angular.IScope {
        var target = this.getRealTarget(event);

        return target.scope();
    }

    /**
     * Stolen from http://www.jqwidgets.com/community/topic/dragend-event-properties-clientx-and-clienty-are-undefined-on-ios/ 
     * Handles both mouse and touch events. Modified for brevity */
    getTouches(event: any): any { // todo
        if (event.originalEvent) {
            if (event.originalEvent.touches && event.originalEvent.touches.length) {
                return event.originalEvent.touches;
            } else if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
                return event.originalEvent.changedTouches;
            }
        }

        if (!event.touches) {
            event.touches = [event.originalEvent];
        }

        return event.touches;
    }
}