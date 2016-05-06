'use strict';

angular.module('levels').factory('touchService', [
    function() {
        // Public API
        return {
            /* Touchmove/touchend will not move along with crossing over elements like mousemove/mouseup will, so we need hax */
            getRealTarget: function(e) {
                var myLocation = this.getTouches(e)[0];

                return angular.element(document.elementFromPoint(myLocation.clientX, myLocation.clientY));
            },

            /* Shortcut for getting actual target scope */
            getTargetScope: function(e) {
                var target = this.getRealTarget(e);

                return target.scope();
            },

            /* Stolen from http://www.jqwidgets.com/community/topic/dragend-event-properties-clientx-and-clienty-are-undefined-on-ios/ 
             * Handles both mouse and touch events. Modified for brevity */
            getTouches: function(e) {
                if (e.originalEvent) {
                    if (e.originalEvent.touches && e.originalEvent.touches.length) {
                        return e.originalEvent.touches;
                    } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                        return e.originalEvent.changedTouches;
                    }
                }

                if (!e.touches) {
                    e.touches = [e.originalEvent];
                }

                return e.touches;
            }
        };
    }
]);