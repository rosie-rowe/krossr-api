'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'Levels', 'Utils',
	function($rootScope, $scope, $stateParams, $timeout, $location, Authentication, Levels, Utils) {
		$scope.authentication = Authentication;
		var penaltyTimer;

		// Create new Level
		$scope.create = function() {
			var layout = Utils.getGameMatrix(),
				timeLimit = Utils.computeTimeLimit($scope.minutes);

			// Create new Level object
			var level = new Levels ({
				name: this.name,
				layout: layout,
				timeLimit: timeLimit
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

			level.$update(function() {
				$location.path('levels/' + level._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Levels
		$scope.find = function() {
			$scope.levels = Levels.query();
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

				console.log(Utils.calculatePlayableArea());

				Utils.createNewGame({
					numberOfTiles: flatLayout.length,
					layout: $scope.level.layout,
					controller: controller
				});
				
			});
		};

		$scope.gameOver = function() {
			Utils.gameOver();
		};

		// gonna utilize the same event included with angular-timer to display the penalty on the screen
	    $scope.$on('timer-add-cd-seconds', function(event, args) {
	        $scope.penaltyAmount = args;
	        $scope.showPenalty = true;

	        // if multiple decrements happen in quick succession, we should reset the timer
	        // to allow the next penalty indicator to show for the full timeout instead of expiring at the end of the first one.
	        $timeout.cancel(penaltyTimer);

	        penaltyTimer = $timeout(function() {
	            $scope.showPenalty = false;
	        }, 1000);
	    });
	}
]);