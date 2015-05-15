'use strict';

angular.module('levels').controller('NumberLineController', ['$scope', '$timeout', 'Utils',
	function($scope, $timeout, Utils) {
		var goalMatrix = Utils.getGoalMatrix(),
			sideLength = goalMatrix.length,
			lineContent = [], // keep lineContent in closure so we maintain it across calls back to an instance of the controller,
			currentGroup = {}, // do the same for currentGroup
			hasGroup = false; // when a group is created, this is set to true so we know not to create it again

		$scope.cssClass = '';

		// display a crossed out 0 if the linecontent comes back with no content. otherwise, pass through
		var accountForZeros = function(lineContent) {
			if (lineContent.length === 0) {
				return [{
					cssClass: 'finishedGrouping',
					text: 0
				}];
			} else {
				return lineContent;
			}
		};

		/* When computing number lines for the top part, we need to reverse the results
		   before joining them for display, so they will appear in the correct order */
		var adjustContentForOrientation = function(lineContent, orientation) {
		   	if (orientation === 'vertical') {
				lineContent = lineContent.reverse();
			};

			return lineContent;
		};

		/* Given a matrix index for a row or column and an indication for which it is,
		   calculate groups of consective tiles in that row or column */
		var calculateGroup = function(index, orientation) {
			var	groupCount = 0,
				gameMatrix = getTargetMatrix(Utils.getGameMatrix(), orientation),
				currentGroup = {},
				targetMatrix = getTargetMatrix(goalMatrix, orientation),
				reset_ind = true,
				coord = {};

			// Loop through the row, building a separate count for each group of consecutive true tiles
			for (var i = 0; i < sideLength; i++) {
				// If the rotated goal matrix contains a true tile at the current index...
				if (targetMatrix[index][i]) {
					if (!currentGroup[groupCount]) {	
						currentGroup[groupCount] = [];
					}

					// Add the tile to the grouping.
					currentGroup[groupCount].push(
						{
							coord: {
								y: index,
								x: i
							},
							currentValue: gameMatrix[index][i],
							goalValue: targetMatrix[index][i]
						}
					);

					/* if a grouping's tiles all contain the correct values, we want to mark that group off in the view so that the user
						can keep better track of their progress */
					$scope.cssClass = determineCssForGroup(currentGroup);

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

		var determineCssForGroup = function(group) {
			var groupAsArray = Object.keys(group);

			var isMarked = groupAsArray.every(function(value, index, array) {
				return determineCssForGrouping(group[value]);
			});

			return isMarked ? 'finishedGrouping' : '';
		}

		var determineCssForGrouping = function(grouping) {
			if (Array.isArray(grouping)) {
				return grouping.every(function(value, index, array) {
					return array[index].currentValue === array[index].goalValue;
				});
			} else {
				return true;
			}
		};

		/* To compute the number lines for the current row or column, we need to find the length of each grouping */
		var getGroupings = function(currentGroup) {
			return Object.keys(currentGroup).map(function(value, index) {
				return {
					cssClass: $scope.cssClass,
					text: currentGroup[value].length
				};
			});
		};

		/* To compute the number lines for the top part, we need to rotate the matrix by 90 degrees first */
		var getTargetMatrix = function(matrix, orientation) {
			if (orientation === 'vertical') {
				return rotate90(matrix);
			} else {
				return matrix;
			}
		};

		/* Knowing the group already exists, update the css classes on it */
		var recalculateGroup = function(index, orientation) {
			var gameMatrix = getTargetMatrix(Utils.getGameMatrix(), orientation);

			/* We need to keep track if anything changed so we know whether or not to actually change lineContent,
				because if we change it regardless we'll end up with the infdig error */
			var changed = false,
				newValue,
				newCssClass,
				coord;

			angular.forEach(currentGroup, function(value, key) {
				var entry = value;
				angular.forEach(entry, function(value, key) {
					if (value.coord) {
						newValue = gameMatrix[value.coord.y][value.coord.x];

						if (value.currentValue !== newValue) {
							value.currentValue = newValue;
							changed = true;
						}
					}
				});
			});

			newCssClass = determineCssForGroup(currentGroup);
			if ($scope.cssClass !== newCssClass) {
				$scope.cssClass = newCssClass;
				changed = true;
			}

			return changed;
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
			if (!hasGroup) {
				currentGroup = calculateGroup(index, orientation);
				hasGroup = true;

				lineContent = accountForZeros(adjustContentForOrientation(getGroupings(currentGroup), orientation));
			} else {
				if (recalculateGroup(index, orientation)) {
					lineContent = accountForZeros(adjustContentForOrientation(getGroupings(currentGroup), orientation));
				};
			}

			return lineContent;
		};
	}
]);