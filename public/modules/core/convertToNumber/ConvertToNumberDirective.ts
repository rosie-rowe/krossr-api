/** Required to have a number select a dropdown's value, stolen from https://docs.angularjs.org/api/ng/directive/select */

export class ConvertToNumberDirective implements angular.IDirective {
    static $name = 'convertToNumber';
    require = 'ngModel';
    restrict = 'A';

    link = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, ngModel: angular.INgModelController) => {
        ngModel.$parsers.push((val: string) => {
            return parseInt(val, 10);
        });

        ngModel.$formatters.push((val: number) => {
            return '' + val;
        });
    }

    constructor() { }
}