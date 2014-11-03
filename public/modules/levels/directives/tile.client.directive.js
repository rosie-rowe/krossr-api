'use strict';

angular.module('levels').directive('tile', [
    function() {
        return {
            controller: 'tileController',
            controllerAs: 'tileCtrl',
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'modules/levels/views/tile.client.view.html',
            link: function(scope, elem, attr) {          
                scope.tileCtrl.editable = attr.editable;

                elem.on('click', function() {
                    scope.tileCtrl.checkWin();
                });
            }
        }
    }
]);