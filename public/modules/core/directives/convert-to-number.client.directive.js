'use strict';

/* Required to have a number select a dropdown's value, stolen from https://docs.angularjs.org/api/ng/directive/select */

angular.module('core').directive('convertToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return parseInt(val, 10);
            });

            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
});