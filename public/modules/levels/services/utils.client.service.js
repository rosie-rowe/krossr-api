'use strict';

angular.module('levels').factory('Utils', [
	function() {
		// Convert service logic
		// ...
		var sideLength,
			gameMatrix,
			goalMatrix;
		// Public API
		return {
			/* Convert a 2D coordinate into an index */
			convertTo1D: function(coord) {
				return (coord.y * sideLength) + coord.x;
			},

			/* Convert an index into a 2D coordinate */
			convertTo2D: function(index) {
			  var x = index % sideLength,
			      y = (index - x) / sideLength,
			      coord = {
			        y: y,
			        x: x
			      };

			  //console.log(coord);
			  return coord;
			},

			/* Convert a Matrix into an array (for ng-repeat to hit all of them) */
			flatten: function(matrix) {
		        return Array.prototype.concat.apply([], matrix);
		    },

		    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
		    getGoalMatrix: function() {
		    	return goalMatrix;
		    },

		    /* Modify the current goal matrix (loading level from layout) */
		    setGoalMatrix: function(layout) {
		    	goalMatrix = layout;
		    },

		    /* Return the current game matrix */
		    getGameMatrix: function() {
		    	return gameMatrix;
		    },

		    /* Return the current side length */
		    getSideLength: function() {
		    	return sideLength;
		    },

		    /* Modfiy a specific coordinate of the game matrix (used for selection of tiles) */
		    setCoord: function(y, x, value) {
		    	gameMatrix[y][x] = value;
		    },

		    /* Modify the current game matrix, setting a new side length as a side effect (used for changing size) */
		    setGameMatrix: function(matrix) {
		    	gameMatrix = matrix;
		    	this.setSideLength(matrix.length);
		    },

		    /* Modify the current side length */
		   	setSideLength: function(length) {
		   		sideLength = length;
		   	},
		};
	}
]);