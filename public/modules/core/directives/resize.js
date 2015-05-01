angular.module('core').directive('resize', function($window) {
  return {
    link: function(scope) {
      angular.element($window).on('resize', function(e) {
        // Namespacing events with name of directive + event to avoid collisions
        scope.$broadcast('resize::resize');
      });
    }
  }
});