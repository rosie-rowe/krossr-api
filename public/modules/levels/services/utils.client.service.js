'use strict';

angular.module('levels').factory('Utils', ['$timeout', '$rootScope',
	function($timeout, $rootScope) {
		// Convert service logic
		// ...
		var sideLength,
			gameMatrix,
			goalMatrix,
			gameWidth,
			gameHeight,
			outerGameSize,
			playableAreaSize,
			tileIndex = [],
			tileSize = 25,
			timeScale = 60, // number to convert minutes to seconds and vice versa... probably not going to change
			winTime = 0, // the time the level was beaten in
			currentPenalty = 4,  // number of seconds to knock off the timer when a wrong answer is given... this is going to increase with each wrong answer
			basePenalty = currentPenalty; // the number to reset the penalty to when changing levels or retrying a level

		// Public API
		return {
			/* Append the current tile index */
			addTileToIndex: function(obj) {
				tileIndex.push(obj);
			},

			resetTimer: function(timeToResetTo) {
				if (timeToResetTo) {
					$rootScope.$broadcast('timer-set-countdown-seconds', timeToResetTo);
				}
			},

			/* Return the width of the main section of the game so we can calculate game and tile sizes off of it */
			calculatePlayableArea: function() {
				var playableArea = angular.element('#playable-area'),
					pHeight = playableArea.outerHeight(),
					pWidth = playableArea.outerWidth();

				playableAreaSize = Math.min(pHeight, pWidth);
				
				return playableAreaSize;
			},

			/* Clear everything, to start a new game */
			clearAll: function() {
				var currentGameMatrix = this.getGameMatrix();
				
				this.clearAllTiles();
				this.clearAllMatrix(currentGameMatrix, currentGameMatrix.length);
				this.clearTileIndex();
				this.setCurrentPenalty(true);
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
				var sideLength;

				if (args.layout) {
					this.setGoalMatrix(args.layout);
				}

				this.createEmptyMatrix(args.numberOfTiles);
				this.clearTileIndex();

				this.calculatePlayableArea();

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

			draw: function() {
				console.log('drawing');
			},

			/* Convert a Matrix into an array (for ng-repeat to hit all of them) */
			flatten: function(matrix) {
				return Array.prototype.concat.apply([], matrix);
			},

			/* End the game (time ran out) */
			gameOver: function() {
				$rootScope.$broadcast('gameOver');
			},

			getCurrentPenalty: function() {
				return currentPenalty;
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

			getOuterGameWidth: function() {
				return this.getWidth('.outer.game') + this.getWidth('.left-grid');
			},
			
			/* Return the current side length */
			getSideLength: function() {
				return sideLength;
			},

			/* Return the current tile index */
			getTileIndex: function() {
				return tileIndex;
			},

			getTileSize: function() {
				return tileSize;
			},

			getTileSizePx: function() {
				return tileSize  + 'px'
			},

			getWinTime: function() {
				return winTime;
			},

			getWidth: function(selector) {
				return angular.element(selector).outerWidth();
			},

			/* When setting up the game, also cache the tiles for faster access later */
			indexTiles: function() {
				var allTiles = angular.element('.tile'),
					_this = this;

				angular.forEach(allTiles, function(value, key) {
					_this.addTileToIndex({ tileCtrl: angular.element(value).scope().tileCtrl });
				});
			},

			// subtract time from the angular-timer
			knockOffTime: function() {
				$rootScope.$broadcast('timer-add-cd-seconds', -(this.getCurrentPenalty()));
				// increment the penalty
				this.setCurrentPenalty();
			},

			/* Modify the current game size */
			setGameSize: function(widthInTiles) {
				var finalWidth = playableAreaSize / 2,
					finalHeight = finalWidth;

				gameWidth = finalWidth + 2 + 'px';
				gameHeight = finalHeight - 2 + 'px';

				this.setTileSize(finalWidth, widthInTiles);
			},

			/* Modify the current goal matrix (loading level from layout) */
			setGoalMatrix: function(layout) {
				goalMatrix = layout;
			},

			/* Modfiy a specific coordinate of the game matrix (used for selection of tiles) */
			setCoord: function(y, x, value) {
				gameMatrix[y][x] = value;
			},

			setCurrentPenalty: function(resetPenalty) {
				if (resetPenalty) {
					currentPenalty = basePenalty;
				} else {
					currentPenalty *= 2;
				}
				console.log(currentPenalty);
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

			setWinTime: function(winTime) {
				winTime = winTime;
				return winTime;
			},

			setWidth: function(selector, width) {
				angular.element(selector).css("width", width);
			},

			startTimer: function() {
				$rootScope.$broadcast('timer-start');
			},

			stopTimer: function() {
				$rootScope.$broadcast('timer-stop');
			}
		};
	}
]);