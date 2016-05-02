'use strict';

angular.module('levels').factory('Utils', ['$timeout', '$rootScope', 'ngDialog',
	function($timeout, $rootScope, ngDialog) {
		// Utils service logic
		// ...
		var sideLength;
		var	gameMatrix;
		var	goalMatrix;
		var	gameWidth;
		var	gameHeight;
		var	outerGameSize;
		var	playableAreaSize;
		var	tileIndex = [];
		var	tileSize = 25;
		var	tutorialDivider = 4; // the amount to divide the size of a game for a tutorial
		var	timeout = 1000; 

		// Public API
		return {
			/* Append the current tile index */
			addTileToIndex: function(obj) {
				tileIndex.push(obj);
			},

			/* Take a given game width and subtract border widths. I either have to do this
				or remove border-box and add them instead... doesn't really matter. */
			adjustForBorders: function(width) {
				var borderWidth = 1;

				/* 18 is a bit of a magic number, I worked backwards from determining how much extra space
					the game had based on sideLength */ 
				return width - ((borderWidth * sideLength) + (18 - sideLength));
			},

			/* Return the width of the main section of the game so we can calculate game and tile sizes off of it */
			calculatePlayableArea: function() {
				var pHeight = window.innerHeight,
					pWidth = window.innerWidth;

				playableAreaSize = Math.min(pHeight, pWidth);

				return Math.floor(playableAreaSize);
			},

			/* Clear everything, to start a new game */
			clearAll: function() {
				var currentGameMatrix = this.getGameMatrix();
				
				this.clearAllTiles();

				if (currentGameMatrix) {
					this.clearAllMatrix(currentGameMatrix, currentGameMatrix.length);
				}

				this.clearTileIndex();
			},

			/* Given a matrix of true/false values, set every value to false */
			clearAllMatrix: function(matrix, value) {
				var len;

				for (var i = 0; i < value; i++) {
					len = matrix[i].length
					for (var j = 0; j < len; j++) {
						matrix[i][j] = false;
					}
				}

				return matrix;
			},

			clearAllTiles: function() {
				var i = 0,
					len = tileIndex.length;

				for (; i < len; i++) {
					tileIndex[i].tileCtrl.fill('empty');
				}
			},

			// make sure the index is clean before we add to it to avoid bugs with switching between screens
			clearTileIndex: function() {
				tileIndex = [];
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
				var goalMatrix;

				if (args.layout) {
					this.setGoalMatrix(args.layout);
				}

				this.clearTileIndex();
				this.calculatePlayableArea();
				this.createEmptyMatrix(args.numberOfTiles);


				/* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
				  then get rid of the goal matrix (since we don't want to be able to win while editing) */
				switch(args.controller) {
					case 'edit':
						goalMatrix = this.getGoalMatrix();

						if (goalMatrix) {
							this.setGameMatrix(goalMatrix);
						}

						this.setGoalMatrix();
						break;
					case 'new':
						this.setGoalMatrix();
						break;
					default:
						break;
				}
			},

			/* Given an index and orientation, pass a message to the tile controller
			 * to mark out the tiles on that line that aren't selected */
			finishLine: function(index, orientation) {
				$rootScope.$broadcast('lineComplete', { index: index, orientation: orientation });
			},

			/* Convert a Matrix into an array (for ng-repeat to hit all of them) */
			flatten: function(matrix) {
				return Array.prototype.concat.apply([], matrix);
			},

			/* Return the current game size (width and height in pixels of the game field, changes depending on number of tiles) */
			getGameSize: function(tutorialMode) {
				// height/width will probably come in as px
				var intHeight = parseInt(gameHeight, 10),
					intWidth = parseInt(gameWidth, 10);

				return {
					gameHeight: tutorialMode ? intHeight / tutorialDivider : gameHeight,
					gameWidth: tutorialMode ? intWidth / tutorialDivider : gameWidth
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
			
			/* Return the current side length */
			getSideLength: function() {
				return sideLength;
			},

			/* Return the current tile index */
			getTileIndex: function() {
				return tileIndex;
			},

			getTileSize: function(tutorialMode) {
				return tutorialMode ? tileSize / tutorialDivider : tileSize;
			},

			getTileSizePx: function() {
				return this.getTileSize()  + 'px'
			},

			getWidth: function(selector) {
				return angular.element(selector).outerWidth();
			},

			/* Display an integer size (e.g. 15) and convert it to a pleasing form (15x15) */
			prettySize: function(size) {
				return size + 'x' + size;
			},

			/* Modfiy a specific coordinate of the game matrix (used for selection of tiles) */
			setCoord: function(y, x, value) {
				gameMatrix[y][x] = value;
			},

			/* Modify the current game size. */
			setGameSize: function(widthInTiles) {
				var finalWidth = Math.floor(playableAreaSize / 1.6),
					finalHeight;

				finalWidth = this.adjustForBorders(finalWidth);

				finalHeight = finalWidth;
				gameWidth = finalWidth + 'px';
				gameHeight = finalHeight + 'px';

				$timeout(function() {
					$rootScope.$broadcast('gameSizeChanged', { width: gameWidth, height: gameHeight });
				});
				
				this.setTileSize(finalWidth, widthInTiles);
			},

			/* Modify the current goal matrix (loading level from layout) */
			setGoalMatrix: function(layout) {
				goalMatrix = layout;
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

			setTileSize: function(gameWidth, widthInTiles) {
				tileSize = gameWidth / parseInt(widthInTiles, 10);
				$rootScope.$broadcast('tileSizeChanged', tileSize);
			},

			/* Make div.gameContainer-inner be only as large as it needs to be,
			*  so the game will be centered in its available space. */
			setOuterGameWidth: function(width) {
				$timeout(function() {
					_this.setWidth('.gameContainer-inner', gameWidth);
				}, 0);
			},

			setWidth: function(selector, width) {
				angular.element(selector).css("width", width);
			},

			// this is here so it can be shared between game.client.controller and levels.client.controller
			updateLevel: function(scope) {
				var level = scope.level,
					_this = this;

				level.size = level.layout.length;

				level.$update(function() {
					
				}, function(errorResponse) {
					scope.error = errorResponse.data.message;

					$timeout(function() {
						scope.error = null;
					}, timeout);
				});
			}
		};
	}
]);