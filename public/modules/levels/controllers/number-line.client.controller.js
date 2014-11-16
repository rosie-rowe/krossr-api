'use strict';

angular.module('levels').controller('NumberLineController', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		// Number line controller logic
		// ...
		$scope.getLineContent = function(index, orientation) {
			var lineContent = [],
				len = $rootScope.goalMatrix[index].length,
				i,
				count = 0,
				targetMatrix;

			//console.log("oreo: " + $scope.orientation);

			switch (orientation) {
				case 'vertical':
					targetMatrix = rotate90($rootScope.goalMatrix);
					break;
				case 'horizontal':
				default:
					targetMatrix = $rootScope.goalMatrix;
					break;
			};

			// Loop through the row, building a separate count for each group of consecutive true tiles
			for (i = 0; i < len; i++) {
				if (targetMatrix[index][i] === true)  {
					count++;
					if(i == len - 1) { addLineContent(lineContent, count.toString(), orientation); }
				} else {
					if (count > 0) {
						addLineContent(lineContent, count.toString(), orientation);
					}
					count = 0;
				}
			};

			// If there are no true tiles in the row, MARK IT ZERO!!!
			if (lineContent.length === 0) {
				addLineContent(lineContent, '0', orientation);
			}

			return lineContent.join(' ');
		};

		// Create a new matrix of equal size to the one passed in, and assign it to the original rotated 90 degrees
		var rotate90 = function(matrix) {
			var sideLength = matrix.length,
				rotatedMatrix = new Array(sideLength);

			for (var i = 0; i < sideLength; i++) {
				rotatedMatrix[i] = new Array(sideLength);
			}
			
			for (var i = 0; i < sideLength; i++) {
				for (var j = 0; j < sideLength; j++) {
					var y = sideLength - i - 1,
						x = j;
					rotatedMatrix[j][i] = matrix[y][x];
				}
			}

			return rotatedMatrix;
		};

		// For vertical lines, the numbers need to be added backwards so they appear in the correct order on the screen
		var addLineContent = function(array, content, orientation) {
			switch (orientation) {
				case 'vertical':
					array.unshift(content);
					break;
				case 'horizontal':
				default:
					array.push(content);
					break;
			}
		};
	}
]);