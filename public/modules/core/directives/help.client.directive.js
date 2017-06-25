'use strict';

angular.module('core').directive('help', [
    function() {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            transclude: true,
            templateUrl: 'modules/core/views/help-contents.client.view.html',
            link: function(scope, elem, attr) {
            }
        }
    }
]);