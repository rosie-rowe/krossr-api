angular.module('core').directive('resize', ['$window', 'debounce', 'Utils', function($window, debounce, Utils) {
  return {
    link: function(scope) {
      var gameMatrix;

      angular.element($window).on('resize', debounce(function(e) {
      	gameMatrix = Utils.getGameMatrix();

      	if (gameMatrix) {
	      	Utils.calculatePlayableArea();
	      	Utils.setGameSize(gameMatrix.length);
	      	scope.$apply();
	    }
      }, 250));
    }
  }
}]);