'use strict';

angular.module('levels').controller('NumberGridController', ['$scope',
	function($scope) {
		// Number grid controller logic
		// ...+
		$scope.groupings = {};

		this.createGrouping = function(orientation) {
			$scope.groupings[orientation] = {};
		}
	}
]);