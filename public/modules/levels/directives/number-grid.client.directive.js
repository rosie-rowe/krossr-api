'use strict';

angular.module('levels').directive('numberGrid', [
	function() {
		return {
			controller: 'NumberGridController',
			controllerAs: 'numGridCtrl',
			templateUrl: 'modules/levels/views/number-grid.client.view.html',
			restrict: 'A',
			scope: {
				orientation: '@',
				layout: '=',
				ctrl: '='
			},
			link: function postLink(scope, element, attrs, numGridCtrl) {
				numGridCtrl.createGrouping(scope.orientation);
			}
		};
	}
]);