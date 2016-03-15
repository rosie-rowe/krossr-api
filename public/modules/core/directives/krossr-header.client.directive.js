'use strict';

angular.module('core').directive('krossrHeader', [
    function() {
        return {
            controller: 'HeaderController',
            //controllerAs: 'helpCtrl',
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'modules/core/views/header.client.view.html',
            link: function(scope, elem, attr) {
            }
        }
    }
]);