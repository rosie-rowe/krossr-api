angular
    .module('krossrApp')
    .directive('game', function() {
      return {
        controller: 'gameController',
        controllerAs: 'gameCtrl',
        restrict: 'E',
        replace: true,
        scope: true,
        transclude: true,
        templateUrl: 'views/game.html',
        link: function (scope, elem, attr) {

        }
      };
    });