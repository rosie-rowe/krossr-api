angular.module('core').directive('resize', ['$window', 'debounce', 'Utils', function($window, debounce, Utils) {
  return {
    link: function(scope) {
      angular.element($window).on('resize', debounce(function(e) {
        // Namespacing events with name of directive + event to avoid collisions
    	Utils.calculatePlayableArea();
    	Utils.setGameSize(Utils.getGameMatrix().length);
    	scope.$apply();
      }, 250));
    }
  }
}]);