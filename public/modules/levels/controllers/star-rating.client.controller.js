angular
	.module("levels")
	.controller("RatingCtrl", ['$scope', '$timeout', 'Authentication', 'Ratings', function($scope, $timeout, Authentication, Ratings) {
		var timeout = 1000;

		$scope.authentication = Authentication;

		$scope.rating = getCurrentRating();

		function getCurrentRating() {
			if ($scope.level.yourRating.length === 1) {
				return $scope.level.yourRating[0].rating;
			} else { 
				return 5;
			}
		};

		$scope.rateFunction = function(newRating) {
			var level = $scope.level,
				rating = level.yourRating;

			$scope.rating = newRating;

			if (rating.length === 1) {
				$scope.update(rating[0]);
			} else {
				$scope.create(level);
			}
		};

		// Add new Rating
		$scope.create = function(level) {
			// Create new Rating object
			var rating = new Ratings ({
				_level: level._id,
				rating: $scope.rating
			});

			// Redirect after save
			rating.$save(function(response) {
				level.ratings.push(rating._id);
				level.$update();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;

				$timeout(function() {
					$scope.error = '';
				}, timeout)
			});
		};

		$scope.update = function(rating) {
			Ratings.update({ _id: rating._id, user: rating.user, rating: $scope.rating }, function(newRating) {
				$scope.level.yourRating[0] = newRating;
			});
		};
	}]);