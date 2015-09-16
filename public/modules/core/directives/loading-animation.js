angular.module('core').directive('loadingAnimation', ['$window', 'debounce', 'Utils', function($window, debounce, Utils) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      condition: '='
    },
    template: '<div class="loadingAnimation animate-hide" ng-show="condition">' +
                  '<div class="loadingAnimation-inner">K</div>' +
              '</div>',
    link: function(scope) {
    }
  }
}]);