'use strict';

// Levels controller
angular.module('levels').controller('LevelsController', ['$rootScope', '$scope', '$stateParams', '$timeout', '$location', 'Authentication', 'Levels', 'Utils',
	function($rootScope, $scope, $stateParams, $timeout, $location, Authentication, Levels, Utils) {
		$scope.authentication = Authentication;

		// Create new Level
		$scope.create = function() {
			var layout = Utils.getGameMatrix();

			// Create new Level object
			var level = new Levels ({
				name: this.name,
				layout: layout
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

		// Remove existing Level
		$scope.remove = function( level ) {
			if ( level ) { level.$remove();

				for (var i in $scope.levels ) {
					if ($scope.levels [i] === level ) {
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
				var flatLayout = Utils.flatten(data.layout);
				Utils.createNewGame({
					numberOfTiles: flatLayout.length,
					layout: $scope.level.layout,
					controller: controller
				});
			});
		};
	}
]);