'use strict';

angular.module('levels').factory('Utils', ['tileSize', '$timeout', '$rootScope',
	function(tileSize, $timeout, $rootScope) {
		// Convert service logic
		// ...
		var sideLength,
			gameMatrix,
			goalMatrix,
			gameWidth,
			gameHeight,
			tileIndex = [],
			timeScale = 60, // number to convert minutes to seconds and vice versa... probably not going to change
			winTime = 0 // the time the level was beaten in
		// Public API
		return {
			/* Append the current tile index */
			addTileToIndex: function(obj) {
				tileIndex.push(obj);
			},

			/* Given a matrix of true/false values, set every value to false */
			clearAllMatrix: function(matrix, value) {
			  for (var i = 0; i < value; i++) {
			    var len = matrix[i].length
			    for (var j = 0; j < len; j++) {
			      matrix[i][j] = false;
			    }
			  }

			  return matrix;
			},

			clearAllTiles: function() {
				// in the unlikely event that this function is called without the tiles being indexed, index them then.
				if (tileIndex.length === 0) {
					this.indexTiles();	
				}

				angular.forEach(tileIndex, function(value, key) {
					tileIndex[key].tileCtrl.fill('empty');
				});
			},

            // make sure the index is clean before we add to it to avoid bugs with switching between screens
			clearTileIndex: function() {
                tileIndex = [];
			},

			/* Convert minutes into seconds */
			computeTimeLimit: function(minutes) {
				return minutes * timeScale;
			},

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

			/* Given a number of tiles, create an empty square matrix with that number */
			createEmptyMatrix: function(value) {
				var valueRoot = Math.sqrt(value),
				  finalMatrix = [];

				for (var i = 0; i < valueRoot; i++) {
					finalMatrix.push(new Array(valueRoot));
				}

				finalMatrix = this.clearAllMatrix(finalMatrix, valueRoot);
				this.setGameMatrix(finalMatrix);
			},

			/* Combine a lot of the other functions here to set up a new game */
			createNewGame: function(args) {
		      if (args.layout) {
		        this.setGoalMatrix(args.layout);
		      } 

		      this.createEmptyMatrix(args.numberOfTiles);
		      this.clearTileIndex();

		      /* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
		          then get rid of the goal matrix (since we don't want to be able to win while editing) */
		      switch(args.controller) {
		      	  case 'edit':
		          	this.setGameMatrix(this.getGoalMatrix());
		          	this.setGoalMatrix();
		          	break;
		          case 'new':
		          	this.setGoalMatrix();
		          	break;
		          default:
		          	break;
		      }
		    },

		    decomputeTimeLimit: function(seconds) {
		    	return seconds / timeScale;
		    },

			/* Convert a Matrix into an array (for ng-repeat to hit all of them) */
			flatten: function(matrix) {
		        return Array.prototype.concat.apply([], matrix);
		    },

		    /* End the game (time ran out) */
		    gameOver: function() {
		    	$rootScope.$broadcast('gameOver');
		    },

		    /* Return the current game size (width and height in pixels of the game field, changes depending on number of tiles) */
		    getGameSize: function() {
		    	return {
		    		gameHeight: gameHeight,
		    		gameWidth: gameWidth
		    	};
		    },

		    /* Return the current game matrix */
		    getGameMatrix: function() {
		    	return gameMatrix;
		    },

		    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
		    getGoalMatrix: function() {
		    	return goalMatrix;
		    },

		    getWinTime: function() {
		    	return winTime;
		    },

		    /* Return the current side length */
		    getSideLength: function() {
		    	return sideLength;
		    },

		    /* Return the current tile index */
		    getTileIndex: function() {
		    	return tileIndex;
		    },

		    /* Evil DOM maniplation in service? Oh well. When setting up the game, also cache the tiles for faster access later */
		    indexTiles: function() {
                var allTiles = angular.element('.tile'),
                	_this = this;

                angular.forEach(allTiles, function(value, key) {
                    _this.addTileToIndex({ tileCtrl: angular.element(value).scope().tileCtrl });
                });
		    },

		    /* Modify the current game size */
		    setGameSize: function(widthInTiles) {
		    	var finalWidth = tileSize * widthInTiles,
			    	finalHeight = tileSize * widthInTiles;

			    gameWidth = finalWidth + 2 + 'px';
			    gameHeight = finalHeight + 'px';
		    },

		    /* Modify the current goal matrix (loading level from layout) */
		    setGoalMatrix: function(layout) {
		    	goalMatrix = layout;
		    },

		    /* Modfiy a specific coordinate of the game matrix (used for selection of tiles) */
		    setCoord: function(y, x, value) {
		    	gameMatrix[y][x] = value;
		    },

		    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
		    setGameMatrix: function(matrix) {
		    	gameMatrix = matrix;
		    	this.setSideLength(matrix.length);
		    	this.setGameSize(matrix.length);
		    },

		    /* Modify the current side length */
		   	setSideLength: function(length) {
		   		sideLength = length;
		   	},

		   	setWinTime: function(winTime) {
		   		winTime = winTime;
		   		return winTime;
		   	}
		};
	}
]);