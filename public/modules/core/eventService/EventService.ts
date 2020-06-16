/** Handles broadcast/on events */

export class EventService {
    static $name = 'eventService';

    static $inject = [
        '$rootScope'
    ]

    constructor(
        private $rootScope: angular.IRootScopeService
    ) {

    }
    
    /** Using this method ensures that an event will always be destroyed when the accompanying scope is destroyed, saving boilerplate code */
    subscribe(scope: angular.IScope, event: string, action: Function): void {
        let eventCanceler = scope.$on(event, (event: angular.IAngularEvent, ...args: any[]) => {
            action(event, args)
        });
        
        scope.$on('destroy', eventCanceler);
    }
}