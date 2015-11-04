angular.module('core').directive('loadingAnimation', ['$window', 'debounce', 'Utils', function($window, debounce, Utils) {
  return {
    restrict: 'A',
    scope: {
      condition: '='
    },
    template: '<div class="loadingAnimation animate-hide" ng-show="condition">' +
                  '<div class="loadingAnimation-inner">' +
                    '<span class="specialK">K</div>' +
                  '</div>' +
              '</div>',
    link: function(scope, element) {
      scope.afterShow = function() {
        element.removeClass('really-hide');
        console.log('why arent i seeing this');
      };
      scope.afterHide = function() {
        element.addClass('really-hide');
      }
    }
  }
}]);