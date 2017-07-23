'use strict';

/** Required to have a number select a dropdown's value, stolen from https://docs.angularjs.org/api/ng/directive/select */

export default function () {
    return () => {
        return {
            require: 'ngModel',
            restrict: 'A',
            link:  (scope, element, attrs, ngModel) => {
                ngModel.$parsers.push((val) => {
                    return parseInt(val, 10);
                });
        
                ngModel.$formatters.push((val) => {
                    return '' + val;
                });
            }
        }
    };
}