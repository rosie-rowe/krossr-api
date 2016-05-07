'use strict';

// enable us to share an instance of levelCtrl between the header and the level

angular.module('levels').directive('levelWrapper', [
    function() {
        return {
            restrict: 'A',
            scope: true,
            controller: 'LevelsController',
            controllerAs: 'levelCtrl'
        };
    }
]);