'use strict';

angular.module('levels').factory('Utils', ['$timeout', '$rootScope', 'ngDialog',
	function($timeout, $rootScope, ngDialog) {
		function UtilsProperty(defaultValue) {
			this.value = defaultValue;
		};

		UtilsProperty.prototype.get = function() {
			return this.value;
		};

		UtilsProperty.prototype.set = function(newValue, setter) {
			this.value = newValue;

			if (typeof setter === 'function') setter({ 'newValue': newValue });
		};

        $rootScope.$on('ngDialog.opened', function() {
          $rootScope.$broadcast('timer-stop');
        });

        $rootScope.$on('ngDialog.closed', function() {
          $rootScope.$broadcast('timer-start');
        });

		// Utils service logic
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
			basePenalty = currentPenalty, // the number to reset the penalty to when changing levels or retrying a level
			tutorialDivider = 4; // the amount to divide the size of a game for a tutorial

		// Public API
		return {
			/* Append the current tile index */
			addTileToIndex: function(obj) {
				tileIndex.push(obj);
			},

			/* Add time to angular-timer */
			addTime: function(timeToAdd) {
				$rootScope.$broadcast('timer-add-cd-seconds', timeToAdd);
			},

			/* Take a given game width and subtract border widths. I either have to do this
				or remove border-box and add them instead... doesn't really matter. */
			adjustForBorders: function(width) {
				var borderWidth = 1;

				/* 18 is a bit of a magic number, I worked backwards from determining how much extra space
					the game had based on sideLength */ 
				return width - ((borderWidth * sideLength) + (18 - sideLength));
			},

			/* You're MEAN! */
			average: function(collection, propertyToAvg) {
				var sum, average;

				if (collection.length > 0) {
					sum = Object.keys(collection).reduce(function(a, b) {
						return a + collection[b][propertyToAvg];
					}, 0);

					average = sum / collection.length;

					return average.toFixed(2);
				} else {
					return 0;
				}
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
				var currentGameMatrix = this.getGameMatrix(),
					winTime = this.getWinTime();
				
				this.clearAllTiles();

				if (currentGameMatrix) {
					this.clearAllMatrix(currentGameMatrix, currentGameMatrix.length);
				}

				this.clearTileIndex();
				this.setCurrentPenalty(true);

				if (winTime) {
					this.addTime(winTime);
				}
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
				var i = 0,
					len = tileIndex.length;

				// in the unlikely event that this function is called without the tiles being indexed, index them then.
				if (len === 0) {
					this.indexTiles();	
					len = tileIndex.length;
				}

				for (; i < len; i++) {
					tileIndex[i].tileCtrl.fill('empty');
				}
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

				this.gameReady.set(true, function(args) {
					$timeout(function() {
						$rootScope.$broadcast('gameReadyChanged', { gameReady: args.newValue });
					}, 0);
				});
			},

			decomputeTimeLimit: function(seconds) {
				return seconds / timeScale;
			},

			// returns an index
			filterToUserId: function(collection, userId) {
				var returnVal = collection.filter(function(item) {
					return item.user === userId
				})[0];

				return collection.indexOfObject(returnVal);
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

			/* End the game (time ran out) */
			gameOver: function() {
				$rootScope.$broadcast('gameOver');
			},

			gameReady: new UtilsProperty(false),

			getCurrentPenalty: function() {
				return currentPenalty;
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

			getWinTime: function() {
				return winTime;
			},

			getWidth: function(selector) {
				return angular.element(selector).outerWidth();
			},

			/* When setting up the game, also cache the tiles for faster access later */
			indexTiles: function() {
				var allTiles = angular.element('.tile'),
					_this = this,
					i = 0,
					len = allTiles.length;

				for (; i < len; i++) {
					_this.addTileToIndex({ tileCtrl: angular.element(allTiles[i]).scope().tileCtrl });
				}
			},

			// subtract time from the angular-timer
			knockOffTime: function() {
				$rootScope.$broadcast('timer-add-cd-seconds', -(this.getCurrentPenalty()));
				// increment the penalty
				this.setCurrentPenalty();
			},

			/* Display an integer size (e.g. 15) and convert it to a pleasing form (15x15) */
			prettySize: function(size) {
				return size + 'x' + size;
			},

			resetTimer: function(timeToResetTo) {
				if (timeToResetTo) {
					$rootScope.$broadcast('timer-set-countdown-seconds', timeToResetTo);
				}
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

			// common logic to findOne and update
			setupLevel: function(level, yourUserId) {
				var yourRating = level.yourRatingIndex = this.filterToUserId(level.ratings, yourUserId);

				if (typeof yourRating !== 'undefined' && yourRating !== -1) {
					level.yourRating = level.ratings[yourRating].rating;
				}

				level.decomputedTimeLimit = this.decomputeTimeLimit(level.timeLimit);
			},

			setWinTime: function(newWinTime) {
				winTime = newWinTime;
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
			},

			// this is here so it can be shared between game.client.controller and levels.client.controller
			updateLevel: function(scope) {
				var level = scope.level,
					timeRemaining = scope.level.timeRemaining,
					_this = this;

				level.timeLimit = this.computeTimeLimit(scope.level.decomputedTimeLimit);
				level.size = level.layout.length;

				level.$update(function() {
					if (scope.authentication && scope.authentication.user) {
						_this.setupLevel(level, scope.authentication.user._id);
					}
					scope.level.timeRemaining = timeRemaining;
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