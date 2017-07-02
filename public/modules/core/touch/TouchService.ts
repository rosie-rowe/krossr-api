import * as angular from 'angular';
import { ITouchService } from './ITouchService';

'use strict';

class TouchService implements ITouchService {
    static $name = 'touchService';

    /** Touchmove/touchend will not move along with crossing over elements like mousemove/mouseup will, so we need hax */
    getRealTarget(event: JQueryEventObject) {
        var myLocation = this.getTouches(event)[0];

        return angular.element(document.elementFromPoint(myLocation.clientX, myLocation.clientY));
    }

    /** Shortcut for getting actual target scope */
    getTargetScope(event: JQueryEventObject) {
        var target = this.getRealTarget(event);

        return target.scope();
    }

    /**
     * Stolen from http://www.jqwidgets.com/community/topic/dragend-event-properties-clientx-and-clienty-are-undefined-on-ios/ 
     * Handles both mouse and touch events. Modified for brevity */
    getTouches(event: any) {
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

angular.module('levels').service(TouchService.$name, TouchService);