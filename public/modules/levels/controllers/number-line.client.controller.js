'use strict';

angular.module('levels').controller('NumberLineController', ['$scope', 'Utils',
	function($scope, Utils) {
		var gameMatrix = Utils.getGameMatrix(),
			goalMatrix = Utils.getGoalMatrix(),
			sideLength = goalMatrix.length,
			lineContent = [], // keep lineContent in closure so we maintain it across calls back to an instance of the controller,
			currentGroup = {}, // do the same for currentGroup
			hasGroup = false; // when a group is created, this is set to true so we know not to create it again


		/* When computing number lines for the top part, we need to reverse the results
		   before joining them for display, so they will appear in the correct order */
		var adjustContentForOrientation = function(lineContent, orientation) {
		   	if (orientation === 'vertical') {
				return lineContent.reverse();
			} else {
				return lineContent;
			}
		};

		/* Given a matrix index for a row or column and an indication for which it is,
		   calculate groups of consective tiles in that row or column */
		var calculateGroup = function(index, orientation) {
			console.log('entered calculateGroup');

			var	groupCount = 0,
				targetMatrix = getTargetMatrix(goalMatrix, orientation),
				currentGroup = {},
				reset_ind = true;

			// Loop through the row, building a separate count for each group of consecutive true tiles
			for (var i = 0; i < sideLength; i++) {
				// If the rotated goal matrix contains a true tile at the current index...
				if (targetMatrix[index][i]) {
					// If there is not already an array for the current grouping of tiles, create it.
					if (!currentGroup[groupCount]) {
						currentGroup[groupCount] = [];
					}

					// Add the tile to the grouping.
					currentGroup[groupCount].push(
						{
							currentValue: gameMatrix[index][i],
							goalValue: goalMatrix[index][i]
						}
					);

					reset_ind = true;
				} else {
					if (reset_ind) {
						groupCount++;
					}

					reset_ind = false;
				}
			};

			return currentGroup;
		};

		/* To compute the number lines for the current row or column, we need to find the length of each grouping */
		var getGroupingLengths = function(currentGroup) {
			return Object.keys(currentGroup).map(function(value, index) {
				return currentGroup[value].length;
			});
		};

		/* To compute the number lines for the top part, we need to rotate the matrix by 90 degrees first */
		var getTargetMatrix = function(goalMatrix, orientation) {
			if (orientation === 'vertical') {
				return rotate90(goalMatrix);
			} else {
				return goalMatrix
			}
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

		/* For a given row or column, compute its number line (guide numbers on the sides of the board */
		$scope.getLineContent = function(index, orientation) {
			//if (!hasGroup) {
				currentGroup = calculateGroup(index, orientation);
				hasGroup = true;

				lineContent = adjustContentForOrientation(getGroupingLengths(currentGroup), orientation);

				if (lineContent.length === 0) {
					lineContent = [0];
				}
			//}

			return lineContent.join(' ');
		};
	}
]);