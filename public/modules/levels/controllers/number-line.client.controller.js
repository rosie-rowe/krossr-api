'use strict';

angular.module('levels').controller('NumberLineController', ['$scope', '$timeout', 'Utils',
	function($scope, $timeout, Utils) {
		var gameMatrix = {}; // We'll store matrices as an object containing 2 arrays, so we can cache the regular and rotated versions
		var goalMatrix = $scope.layout || Utils.getGoalMatrix();
		var	sideLength = goalMatrix.length;
		var	lineContent = []; // keep lineContent in closure so we maintain it across calls back to an instance of the controller,
		var	currentGroup = {}; // do the same for currentGroup
		var	hasGroup = false; // when a group is created, this is set to true so we know not to create it again
		var	pvt = {}; 
		var targetMatrix = {};

		$scope.cssClass = '';
		$scope.controllerName = 'numberLine';

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
			var	groupCount = 0;
			var	currentGroup = {};
			var	reset_ind = true;
			var	coord = {};

			gameMatrix[orientation] = gameMatrix[orientation] instanceof Array ? gameMatrix[orientation] : getTargetMatrix(Utils.getGameMatrix(), orientation);
			targetMatrix[orientation] = targetMatrix[orientation] instanceof Array ? targetMatrix[orientation] : getTargetMatrix(goalMatrix, orientation);

			// Loop through the row, building a separate count for each group of consecutive true tiles
			for (var i = 0; i < sideLength; i++) {
				// If the rotated goal matrix contains a true tile at the current index...
				if (targetMatrix[orientation][index][i]) {
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
							currentValue: gameMatrix[orientation][index][i],
							goalValue: targetMatrix[orientation][index][i]
						}
					);

					/* if a grouping's tiles all contain the correct values, we want to mark that group off in the view so that the user
						can keep better track of their progress */
					$scope.cssClass = determineCssForGroup(currentGroup, index, orientation);

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

		var determineCssForGroup = function(group, index, orientation) {
			var groupCompleted = isGroupCompleted(group);

			if (groupCompleted) {
				/* If the group is finished, we should send a message to the tile controller
				 * containing the row or column's index and orientation so that
				 * we can mark out the remaining tiles automatically */
				Utils.finishLine(index, orientation);
				return 'finishedGrouping';
			} else {
				return '';
			}
		};

		var isGroupCompleted = function(group) {
			var groupAsArray = Object.keys(group);

			return groupAsArray.every(function(value, index, array) {
				return isGroupingCompleted(group[value]);
			});
		};

		var isGroupingCompleted = function(grouping) {
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
			if (matrix) {
				if (orientation === 'vertical') {
					return rotate90(matrix);
				} else {
					return matrix;
				}
			} else {
				debugger;
			}
		};

		/* Knowing the group already exists, update the css classes on it */
		var recalculateGroup = function(index, orientation) {
			gameMatrix[orientation] = gameMatrix[orientation] instanceof Array ? gameMatrix[orientation] : getTargetMatrix(Utils.getGameMatrix(), orientation);

			/* We need to keep track if anything changed so we know whether or not to actually change lineContent,
				because if we change it regardless we'll end up with the infdig error */
			var changed = false;
			var newValue;
			var newCssClass;
			var coord;
			var currentGroupAsArray = Object.keys(currentGroup);
			var i = 0;
			var j;
			var groupLen = currentGroupAsArray.length;
			var entry;
			var entryLen;
			var value;

			for (; i < groupLen; i++) {
				entry = currentGroup[currentGroupAsArray[i]];
				entryLen = entry.length;

				for (j = 0; j < entryLen; j++) {
					value = entry[j];

					if (value.coord) {
						newValue = gameMatrix[orientation][value.coord.y][value.coord.x];

						if (value.currentValue !== newValue) {
							value.currentValue = newValue;
							changed = true;
						}
					}
				}
			}	

			newCssClass = determineCssForGroup(currentGroup, index, orientation);

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

		$scope.getHeight = function() {
			var tileSize = Utils.getTileSize();

			return $scope.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
		}

		$scope.getWidth = function() {
			var tileSize = Utils.getTileSize();

			return $scope.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
		};

		pvt.init = function() {
			//console.log('init number line!');
		};

		pvt.init();
	}
]);