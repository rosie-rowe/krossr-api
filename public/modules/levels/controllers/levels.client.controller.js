'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$http', '$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'debounce', 'Levels', 'ngDialog', 'Utils',
	function($http, $rootScope, $scope, $stateParams, $timeout, $location, Authentication, debounce, Levels, ngDialog, Utils) {
		$scope.authentication = Authentication;
		$scope.currentPage = 0;
		$scope.validNumber = /^\d+$/;
		$scope.sizeRestriction = '';
		$scope.sortDirection = '';
		$scope.showFilter = false;

		var timeout = 1000;

		var changeGameReadyState = function(isReady) {
			$scope.gameReady = isReady;
		};

		var setGameReady = function(isReady) {
			Utils.gameReady.set.call(Utils, isReady, changeGameReadyState.bind(null, isReady));
		};

		$scope.clearAll = function(action) {
			console.log('clearing all! action: ' + action);
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
				$scope.level.lives = undefined;
			}
		};

		// Split out for easier testing
		$scope.submitCreate = function() {
			var layout = Utils.getGameMatrix();

			// Create new Level object
			var level = new Levels ({
				name: this.level.name,
				layout: layout,
				lives: this.level.lives,
				size: layout.length
			});

			var levelSaveSuccess = function(response) {
				$scope.loadLevel(response.id, 'edit');
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
			var action = 'new';

			$scope.clearAll(action)
			$scope.currentView = undefined;

			setGameReady(false);

			$scope.currentView = action;
			$scope.ctrl.setGameSize($scope.ctrl.options.size)
			$scope.ctrl.createGameArray(action);
			$scope.ctrl.getLayoutForRepeater(action);
		};

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
					currentLevel.prettySize = Utils.prettySize(currentLevel.layout.length);
					currentLevel.averageRating = Utils.average(currentLevel.ratings, 'rating');
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

					$scope.level.currentLives = data.lives;

					var flatLayout = Utils.flatten(data.layout);

					Utils.calculatePlayableArea();

					Utils.createNewGame({
						numberOfTiles: flatLayout.length,
						layout: $scope.level.layout,
						controller: controller
					});

					debugger;

					if ($scope.ctrl) {
						$scope.ctrl.getLayoutForRepeater(controller, $scope.level.layout);
						$scope.currentView = controller;
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
			$scope.currentView = undefined;

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

		/* Doing this old school until I figure out a better way */
		$scope.rate = function() {
			$timeout(function() {
				var url = '/levels/' + $scope.level.id + '/ratings';

				var post_data = {
					rating: $scope.level.yourRating
				};

				$http.post(url, post_data).success(function() {
					console.log('omg');
				});
			});
		};

		$scope.setSizeRestriction = function(sizeRestriction) {
			$scope.sizeRestriction = sizeRestriction;
			$scope.find();
		};

		$scope.setSearchText = debounce(function(searchText) {
			$scope.searchText = searchText ? searchText : null;
			$scope.find();
		}, 250);

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

	    $scope.$on('gameReadyChanged', function(event, args) {
	    	changeGameReadyState(args.gameReady);
	    });
	}
]);