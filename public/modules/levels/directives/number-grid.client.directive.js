'use strict';

angular.module('levels').directive('numberGrid', [
	function() {
		return {
			controller: 'NumberGridController',
			controllerAs: 'numGridCtrl',
			templateUrl: 'modules/levels/views/number-grid.client.view.html',
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs, numGridCtrl) {
				console.log(attrs.orientation);
				scope.orientation = attrs.orientation;
				numGridCtrl.createGrouping(scope.orientation);
			}
		};
	}
]);