'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$http', '$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'debounce', 'Levels', 'ngDialog', 'Utils',
	function($http, $rootScope, $scope, $stateParams, $timeout, $location, Authentication, debounce, Levels, ngDialog, Utils) {
        var _this = this;

		this.authentication = Authentication;
		$scope.controllerName = 'levels';
		$scope.currentPage = 0;
		$scope.validNumber = /^\d+$/;
		$scope.sizeRestriction = '';
		$scope.sortDirection = '';
		$scope.showFilter = false;

		var timeout = 1000;

		var clearLevel = function() {
			if ($scope.level) {
				$scope.level = undefined;
			}
		}

		this.clearAll = function(action) {
			console.log('clearing all! action: ' + action);
			Utils.clearAll();
			clearLevel();
		}

		// Create new Level (submit function)
		this.create = function(level, successFunc, failFunc) {
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
		this.createNewLevel = function() {
			var action = 'new';
            var oldLevel = angular.copy($scope.level);

			_this.clearAll(action)

			$scope.level = undefined;

			$scope.ctrl.setGameSize($scope.ctrl.options.size)
			$scope.ctrl.createGameArray(action);
			$scope.ctrl.getLayoutForRepeater(action);
			$scope.level = {
				currentView: action,
				ready: true,
                name: oldLevel ? oldLevel.name : '',
                lives: oldLevel ? oldLevel.lives : undefined
			};
		};

		this.confirmClear = function() {
			ngDialog.openConfirm({
				closeByDocument: false,
				template: 'modules/levels/views/clear-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		this.confirmRemove = function() {
			ngDialog.openConfirm({
				closeByDocument: false,
				template: 'modules/levels/views/delete-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		this.confirmUpdate = function() {
			ngDialog.openConfirm({
				closeByDocument: false,
				template: 'modules/levels/views/update-confirmation.client.view.html',
				showClose: false,
				scope: $scope
			});
		};

		// Find a list of Levels
		this.find = function() {
			var queryObj = {
				pageNum: $scope.currentPage,
				sizeRestriction: $scope.sizeRestriction,
				searchText: $scope.searchText,
				sortBy: $scope.sortBy,
				sortDirection: $scope.sortDirection
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
				}
			});
		};

		// Find existing Level
		this.findOne = function(controller) {
			if ($scope.ctrl) {
				$scope.ctrl.finalLayout = {};
			}

			$scope.level = undefined;

			// store the name of the controller so we can have the same functions do different things
			// depending on new, edit, etc.
			$scope.controller = controller;

			if ($scope.selectedLevelId) {
				Levels.get({ 
					levelId: $scope.selectedLevelId
				}).$promise.then(function(data) {
					$scope.level = data;

					console.log('setting currentLives to: ' + data.lives);
					$scope.level.currentLives = data.lives;

					var flatLayout = Utils.flatten(data.layout);

					Utils.calculatePlayableArea();

					Utils.createNewGame({
						numberOfTiles: flatLayout.length,
						layout: $scope.level.layout,
						controller: controller
					});

					if ($scope.ctrl) {
						$scope.ctrl.getLayoutForRepeater(controller, $scope.level.layout);
						$scope.level.currentView = controller;
					}

					console.log('At this point we should be on ' + controller);
					console.log('We are actually on ' + $scope.level.currentView);

					$scope.level.won = false;
					$scope.level.lost = false;
					$scope.level.ready = true;
				});
			}
		};

        this.loadLevel = function(levelId, action) {
            clearLevel();

            $scope.selectedLevelId = levelId;
            _this.findOne(action);
        };

		this.openLevelSelect = function () {
			ngDialog.open({
				template: 'modules/levels/views/list-levels.client.view.html',
				scope: $scope
			});
		};

		this.reloadLevel = function(action) {
			_this.loadLevel($scope.level.id, action);
		};

		// Remove existing Level
		this.remove = function(level) {
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

		this.pageDown = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
				_this.find();
			}
		};

		this.pageUp = function() {
			//currentPage will be off by 1 since it's 0-indexed
			if ($scope.currentPage + 1 < $scope.totalPages) {
				$scope.currentPage++;
				_this.find();
			}
		};

		/* Doing this old school until I figure out a better way */
		this.rate = function() {
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

		this.setSizeRestriction = function(sizeRestriction) {
			$scope.sizeRestriction = sizeRestriction;
			_this.find();
		};

		this.setSearchText = debounce(function(searchText) {
			$scope.searchText = searchText ? searchText : null;
			_this.find();
		}, 250);

		this.setSortBy = function(sort_by) {
			$scope.sortBy = sort_by ? sort_by : null;
			_this.find();
		};

		this.setSortDirection = function(sort_direction) {
			$scope.sortDirection = sort_direction ? sort_direction : '';
			_this.find();
		};

        // Split out for easier testing
        this.submitCreate = function() {
            var layout = Utils.getGameMatrix();

            // Create new Level object
            var level = new Levels ({
                name: $scope.level.name,
                layout: layout,
                lives: $scope.level.lives,
                size: layout.length
            });

            var levelSaveSuccess = function(response) {
                _this.loadLevel(response.id, 'edit');
            };

            var levelSaveFailure = function(err) {
                $scope.error = err.data.message;

                $timeout(function() {
                    $scope.error = '';
                }, timeout)
            }

            _this.create(level, levelSaveSuccess, levelSaveFailure);
        }

		this.toggleShowFilter = function() {
			$scope.showFilter = !$scope.showFilter;
		}

        // Update existing Level
        this.update = function() {
            Utils.updateLevel($scope);
        };
	}
]);