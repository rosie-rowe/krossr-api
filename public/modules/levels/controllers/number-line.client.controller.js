'use strict';

angular.module('levels').controller('NumberLineController', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		var sideLength = $rootScope.goalMatrix.length;
		// Number line controller logic
		// ...
		$scope.getLineContent = function(index, orientation) {
			var lineContent = [],
				len = sideLength,
				i,
				count = 0,
				targetMatrix,
				currentGroup = {},
				groupCount = 0;

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
					if (!currentGroup[groupCount]) {
						currentGroup[groupCount] = [];
					}
					currentGroup[groupCount].push({x: i, currentValue: $rootScope.gameMatrix[index][i]});
					count++;
				} else {
					if (count > 0) {
						groupCount++;
					}
					count = 0;
				}
			};

			var lineContent = Object.keys(currentGroup).map(function(value, index) {
				return currentGroup[value].length;
			});

			if (orientation === 'vertical') {
				lineContent = lineContent.reverse();
			}

			if (lineContent.length === 0) {
				lineContent = [0];
			}

			return lineContent.join(' ');
		};

		// Create a new matrix of equal size to the one passed in, and assign it to the original rotated 90 degrees
		var rotate90 = function(matrix) {
			var rotatedMatrix = new Array(sideLength);

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
	}
]);