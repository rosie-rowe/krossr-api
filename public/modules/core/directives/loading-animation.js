angular.module('core').directive('loadingAnimation', ['$window', 'debounce', 'Utils', function($window, debounce, Utils) {
  return {
    restrict: 'A',
    scope: {
      condition: '='
    },
    template: '<div class="loadingAnimation animate-hide" k-show="condition" after-hide="afterHide()" after-show="afterShow()">' +
                  '<div class="loadingAnimation-inner">K</div>' +
              '</div>',
    link: function(scope, element) {
      scope.afterShow = function() {
      };
      scope.afterHide = function() {
        element.addClass('really-hide');
      }
    }
  }
}]);