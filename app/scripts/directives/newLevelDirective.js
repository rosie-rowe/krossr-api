angular
    .module('krossrApp')
    .directive('newLevel', function() {
      return {
        restrict: 'E',
        replace: true,
        scope: true,
        transclude: true,
        templateUrl: 'views/newLevel.html',
        link: function (scope, elem, attr) {
        
        }
      };
    });