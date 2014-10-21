angular
  .module('krossrApp')
    .directive('tile', function() {
      return {
        controller: 'tileController',
        controllerAs: 'tileCtrl',
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/views/tile.html',
        link: function(scope, elem, attr) {          

        }
      }
    })