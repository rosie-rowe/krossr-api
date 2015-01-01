'use strict';

angular.module('levels').factory('Convert', [
	function() {
		// Convert service logic
		// ...

		// Public API
		return {
			convertTo1D: function(coord, sideLength) {
				return (coord.y * sideLength) + coord.x;
			},
			convertTo2D: function(index, sideLength) {
			  var x = index % sideLength,
			      y = (index - x) / sideLength,
			      coord = {
			        y: y,
			        x: x
			      };

			  //console.log(coord);
			  return coord;
			}
		};
	}
]);