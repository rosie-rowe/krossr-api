'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'Levels', 'Utils',
	function($rootScope, $scope, $stateParams, $timeout, $location, Authentication, Levels, Utils) {
		$scope.authentication = Authentication;
		$scope.currentPage = 0;

		// get total number of levels
		//$scope.totalCount = Levels.count();

		var penaltyTimer;

		// Create new Level
		$scope.create = function() {
			var layout = Utils.getGameMatrix(),
				timeLimit = Utils.computeTimeLimit($scope.minutes);

			// Create new Level object
			var level = new Levels ({
				name: this.name,
				layout: layout,
				timeLimit: timeLimit,
				size: layout.length
			});

			// Redirect after save
			level.$save(function(response) {
				$location.path('levels/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// this needs to be here so Edit can see it
		$scope.decomputeTimeLimit = Utils.decomputeTimeLimit;

		// Remove existing Level
		$scope.remove = function( level ) {
			if ( level ) { level.$remove();

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

		// Update existing Level
		$scope.update = function() {
			var level = $scope.level;

			level.timeLimit = Utils.computeTimeLimit($scope.level.decomputedTimeLimit);
			level.size = level.layout.length;

			level.$update(function() {
				$location.path('levels/' + level._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Levels
		$scope.find = function() {
			var queryObj = {
				pageNum: $scope.currentPage,
				sizeRestriction: $scope.sizeRestriction
			};

			console.log(queryObj.sizeRestriction);

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
					currentLevel.size = Utils.prettySize(currentLevel.layout.length);
				}
			});
		};

		// Find existing Level
		$scope.findOne = function(controller) {
			$scope.level = Levels.get({ 
				levelId: $stateParams.levelId
			});


			$scope.level.$promise.then(function(data) {
				$scope.level.decomputedTimeLimit = Utils.decomputeTimeLimit($scope.level.timeLimit);

				$scope.level.timeRemaining = $scope.level.timeLimit;


				var flatLayout = Utils.flatten(data.layout);

				Utils.calculatePlayableArea();

				Utils.createNewGame({
					numberOfTiles: flatLayout.length,
					layout: $scope.level.layout,
					controller: controller
				});
				
			});
		};

		$scope.pageDown = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
				$scope.find();
			}
		}

		$scope.pageUp = function() {
			//currentPage will be off by 1 since it's 0-indexed
			if ($scope.currentPage + 1 < $scope.totalPages) {
				$scope.currentPage++;
				$scope.find();
			}
		};

		$scope.gameOver = function() {
			Utils.gameOver();
		};

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
		        }, 1000);
	    	}
	    });
	}
]);