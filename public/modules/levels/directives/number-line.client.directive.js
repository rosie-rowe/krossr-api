'use strict';

angular.module('levels').directive('numberLine', [
	function() {
		return {
			controller: "NumberLineController",
			controllerAs: "numLineCtrl",
			templateUrl: 'modules/levels/views/number-line.client.view.html',
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				
				element.on('click', '.entry', function() {
					var $this = angular.element(this);

					$this.toggleClass('finishedGrouping');
				});

			},
			scope: true
		};
	}
]);