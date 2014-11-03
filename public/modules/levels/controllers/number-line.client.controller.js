'use strict';

angular.module('levels').controller('NumberLineController', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		// Number line controller logic
		// ...
		$scope.getLineContent = function(index, orientation) {
			var lineContent = "",
				len = $rootScope.goalMatrix[index].length,
				i,
				count = 0;

			//console.log("oreo: " + $scope.orientation);

			for (i = 0; i < len; i++) {
				if ($rootScope.goalMatrix[index][i] === true)  {
					count++;
					if(i == len - 1) { lineContent += count.toString(); }
				} else {
					if (count > 0) {
						lineContent += count.toString() + " ";
					}
					count = 0;
				}
			};

			return lineContent;
		}
	}
]);