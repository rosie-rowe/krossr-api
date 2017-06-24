'use strict';

/** Handles broadcast/on events */

class EventService implements IEventService {
    static $name = 'eventService';

    static $inject = [
        '$rootScope'
    ]

    constructor(
        private $rootScope: angular.IRootScopeService
    ) {

    }
    
    /** Using this method ensures that an event will always be broadcast from the root down instead of having to worry about hierarchy. */
    publish(event: string, ...args: any[]) {
        this.$rootScope.$broadcast(event, args);
    }

    /** Using this method ensures that an event will always be destroyed when the accompanying scope is destroyed, saving boilerplate code */
    subscribe(scope: angular.IScope, event: string, action: Function) {
        let eventCanceler = scope.$on(event, (...args: any[]) => action(args));
        
        scope.$on('destroy', eventCanceler);
    }
}

angular.module('core').service(EventService.$name, EventService);