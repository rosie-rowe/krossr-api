angular.module('core').directive('kShow', function($animate) {
  return {
    scope: {
      'kShow': '=',
      'afterShow': '&',
      'afterHide': '&'
    },
    link: function(scope, element) {
      scope.$watch('kShow', function(show, oldShow) {
        if (show) {
          $animate.removeClass(element, 'ng-hide').then(scope.afterShow);
        }
        if (!show) {
          $animate.addClass(element, 'ng-hide').then(scope.afterHide);
        }
      });
    }
  }
})