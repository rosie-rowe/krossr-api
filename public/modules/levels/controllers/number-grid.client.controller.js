'use strict';

angular.module('levels').controller('NumberGridController', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		// Number grid controller logic
		// ...+
		$scope.groupings = {};

		this.createGrouping = function(orientation) {
			$scope.groupings[orientation] = {};
		}
	}
]);