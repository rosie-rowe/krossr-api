interface ITouchService {
    getRealTarget(event: JQueryEventObject): angular.IAugmentedJQuery;
    getTargetScope(event: JQueryEventObject): angular.IScope;
    getTouches(event: any): any;    
}