'use strict';

angular.module('levels').directive('game', [
    function() {
        return {
            controller: 'gameController',
            controllerAs: 'gameCtrl',
            restrict: 'E',
            replace: true,
            scope: true,
            transclude: true,
            templateUrl: 'modules/levels/views/game.client.view.html',
            link: function (scope, elem, attr) {
                elem.on('mouseenter', function() {
                    elem.focus();
                });
            }
        };
    }
]);