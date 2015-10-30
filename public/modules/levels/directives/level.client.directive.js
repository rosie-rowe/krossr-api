'use strict';

angular.module('levels').directive('level', [
    function() {
        return {
            controller: 'LevelsController',
            controllerAs: 'levelCtrl',
            restrict: 'E',
            scope: {
                ctrl: '=',
                level: '=',
                mode: '='
            },
            templateUrl: 'modules/levels/views/level.client.view.html',
            link: function (scope, elem, attr, levelCtrl) {
                var pvt = {};

                pvt.init = function() {
                };

                pvt.init();
            }
        };
    }
]);