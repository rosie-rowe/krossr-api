'use strict';

angular.module('levels').directive('numberLine', [
	function() {
		return {
			controller: "NumberLineController",
			controllerAs: "numLineCtrl",
			templateUrl: 'modules/levels/views/number-line.client.view.html',
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				// Number line directive logic
				// ...

			}
		};
	}
]);