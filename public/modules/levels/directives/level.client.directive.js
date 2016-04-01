'use strict';

angular.module('levels').directive('level', [
    function() {
        return {
            restrict: 'E',
            scope: {
                levelCtrl: '=',
                ctrl: '=',
                level: '='
            },
            templateUrl: 'modules/levels/views/level.client.view.html',
            link: function (scope, elem, attr) {
                var pvt = {};

                pvt.init = function() {
                };

                pvt.init();

                scope.$on('$destroy', function() {
                    console.log('hi');
                });
            }
        };
    }
]);