interface IEventService {
    publish(event: string, ...args: any[]);
    subscribe(scope: angular.IScope, event: string, ...args: any[]);
}