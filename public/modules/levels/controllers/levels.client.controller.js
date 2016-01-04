'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'Levels', 'Ratings', 'ngDialog', 'Utils',
	function($rootScope, $scope, $stateParams, $timeout, $location, Authentication, Levels, Ratings, ngDialog, Utils) {
		$scope.authentication = Authentication;
		$scope.currentPage = 0;
		$scope.validNumber = /^\d+$/;
		$scope.sizeRestriction = '';
		$scope.sortDirection = '';
		$scope.showFilter = false;

		var penaltyTimer,
			timeout = 1000,
			changeGameReadyState = function(isReady) {
				$scope.gameReady = isReady;
			},
			setGameReady = function(isReady) {
				Utils.gameReady.set.call(Utils, isReady, changeGameReadyState.bind(null, isReady));
			}

		$scope.clearAll = function(action) {
			Utils.clearAll();

			switch (action) {
				case 'edit':
				case 'new':
					$scope.clearAllInputs();
					break;

				default:
					break;
			}
		}

		$scope.clearAllInputs = function() {
			if ($scope.level) {
				$scope.level.name = undefined;
				$scope.level.decomputedTimeLimit = undefined;
			}
		};

		// Split out for easier testing
		$scope.submitCreate = function() {
			var layout = Utils.getGameMatrix();

			// Create new Level object
			var level = new Levels ({
				name: this.level.name,
				layout: layout,
				timeLimit: Utils.computeTimeLimit(this.level.decomputedTimeLimit),
				size: layout.length
			});

			var levelSaveSuccess = function(response) {
				$scope.loadLevel(response._id, 'edit');
			};

			var levelSaveFailure = function(err) {
				$scope.error = err.data.message;

				$timeout(function() {
					$scope.error = '';
				}, timeout)
			}

			$scope.create(level, levelSaveSuccess, levelSaveFailure);
		}

		// Create new Level (submit function)
		$scope.create = function(level, successFunc, failFunc) {
			// Redirect after save
			level.$save(function(response) {
				if (typeof successFunc === 'function') {
					successFunc(response);
				}
			}, function(errorResponse) {
				if (typeof failFunc === 'function') {
					failFunc(errorResponse);
				}
			});
		};

		// Create new level (load template)
		$scope.createNewLevel = function() {
			$scope.clearAll()
			$scope.ctrl.currentView = undefined;

			setGameReady(false);

			$scope.ctrl.currentView = 'new';
			$scope.ctrl.setGameSize($scope.ctrl.options.size)
			$scope.ctrl.createGameArray('new');
			$scope.ctrl.getLayoutForRepeater('new');
		};

		// this needs to be here so Edit can see it
		$scope.decomputeTimeLimit = Utils.decomputeTimeLimit;

		$scope.confirmClear = function() {
			ngDialog.openConfirm({
				controller: 'LevelsController',
				closeByDocument: false,
				template: 'modules/levels/views/clear-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		$scope.confirmRemove = function() {
			ngDialog.openConfirm({
				controller: 'LevelsController',
				closeByDocument: false,
				template: 'modules/levels/views/delete-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		$scope.confirmUpdate = function() {
			ngDialog.openConfirm({
				controller: 'LevelsController',
				closeByDocument: false,
				template: 'modules/levels/views/update-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		$scope.gameOver = function() {
			Utils.gameOver();
		};

		// Find a list of Levels
		$scope.find = function() {
			var queryObj = {
				pageNum: $scope.currentPage,
				sizeRestriction: $scope.sizeRestriction,
				searchText: $scope.searchText,
				sortBy: $scope.sortBy,
				sortDirection: $scope.sortDirection.ratings
			};

			Levels.query(queryObj, function(data) {
				var i = 0,
					allLevels = data.levels,
					len = allLevels ? allLevels.length : 0,
					currentLevel;

				$scope.totalPages = Math.ceil(data.count / data.numPerPage);
				$scope.levels = data.levels;

				// Calculate the size for each level so we can display it to the screen & sort by size
				for (; i < len; i++ ) {
					currentLevel = allLevels[i];

					if ($scope.authentication && $scope.authentication.user) {
						Utils.setupLevel(currentLevel, $scope.authentication.user._id);
					}

					currentLevel.prettySize = Utils.prettySize(currentLevel.layout.length);
					currentLevel.averageRating = Utils.average(currentLevel.Ratings, 'rating');
				}
			});
		};

		// Find existing Level
		$scope.findOne = function(controller) {
			if ($scope.ctrl) {
				$scope.ctrl.finalLayout = {};
			}

			$scope.level = {};

			// store the name of the controller so we can have the same functions do different things
			// depending on new, edit, etc.
			$scope.controller = controller;

			if ($scope.selectedLevelId) {
				Levels.get({ 
					levelId: $scope.selectedLevelId
				}).$promise.then(function(data) {
					$scope.level = data;

					if ($scope.authentication && $scope.authentication.user) {
						Utils.setupLevel($scope.level, $scope.authentication.user._id);
					}

					$scope.level.timeRemaining = $scope.level.timeLimit;

					var flatLayout = Utils.flatten(data.layout);

					Utils.calculatePlayableArea();

					Utils.createNewGame({
						numberOfTiles: flatLayout.length,
						layout: $scope.level.layout,
						controller: controller
					});

					if ($scope.ctrl) {
						$scope.ctrl.getLayoutForRepeater(controller, $scope.level.layout);
						$scope.ctrl.currentView = controller;
					}
				});
			}
		};

		$scope.openLevelSelect = function () {
			ngDialog.open({
				template: 'modules/levels/views/list-levels.client.view.html',
				scope: $scope
			});
		};

		// Remove existing Level
		$scope.remove = function(level) {
			if (level) { 
				level.$remove(function() {
					$location.path('levels');
				});

				for (var i in $scope.levels) {
					if ($scope.levels[i] === level ) {
						$scope.levels.splice(i, 1);
					}
				}
			} else {
				$scope.level.$remove(function() {
					$location.path('levels');
				});
			}
		};

		$scope.loadLevel = function(levelId, action) {
			$scope.ctrl.currentView = undefined;

			setGameReady(false);

			$scope.selectedLevelId = levelId;
			$scope.findOne(action);
		};

		// Update existing Level
		$scope.update = function() {
			Utils.updateLevel($scope);
		};

		$scope.pageDown = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
				$scope.find();
			}
		};

		$scope.pageUp = function() {
			//currentPage will be off by 1 since it's 0-indexed
			if ($scope.currentPage + 1 < $scope.totalPages) {
				$scope.currentPage++;
				$scope.find();
			}
		};

		$scope.rate = function() {
			// timeout to give yourRating a digest cycle to catch up
			$timeout(function() {
				// we want to add a new rating if there's not already one there, otherwise update the existing one
				var yourRating = $scope.level.yourRatingIndex = Utils.filterToUserId($scope.level.ratings, $scope.authentication.user._id);

				console.log($scope.level.ratings[yourRating]);

				if ($scope.level.ratings[yourRating]) {
					$scope.level.ratings[yourRating].rating = $scope.level.yourRating;
				} else {
					$scope.level.ratings.push({ user: $scope.authentication.user._id, rating: $scope.level.yourRating });
				}
				$scope.update();
			}, 0);
		};

		$scope.setSizeRestriction = function(sizeRestriction) {
			$scope.sizeRestriction = sizeRestriction;
			$scope.find();
		};

		$scope.setSearchText = function(username) {
			$scope.searchText = username ? username : null;
			$scope.find();
		};

		$scope.setSortBy = function(sort_by) {
			$scope.sortBy = sort_by ? sort_by : null;
			$scope.find();
		};

		$scope.setSortDirection = function(sort_direction) {
			$scope.sortDirection = sort_direction ? sort_direction : '';
			$scope.find();
		};

		$scope.toggleShowFilter = function() {
			$scope.showFilter = !$scope.showFilter;
		}

		// gonna utilize the same event included with angular-timer to display the penalty on the screen
	    $scope.$on('timer-add-cd-seconds', function(event, args) {
	    	// don't want to see the time being added to the clock, for example, when adding it back when pressing 'play again'
	    	if (args < 0) {
		        $scope.penaltyAmount = args;
		        $scope.showPenalty = true;

		        // if multiple decrements happen in quick succession, we should reset the timer
		        // to allow the next penalty indicator to show for the full timeout instead of expiring at the end of the first one.
		        $timeout.cancel(penaltyTimer);

		        penaltyTimer = $timeout(function() {
		            $scope.showPenalty = false;
		        }, timeout);
	    	}
	    });

	    $scope.$on('gameReadyChanged', function(event, args) {
	    	changeGameReadyState(args.gameReady);
	    });
	}
]);