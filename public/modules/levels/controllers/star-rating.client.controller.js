angular
	.module("levels")
	.controller("RatingCtrl", ['$scope', '$timeout', 'Authentication', 'Ratings', function($scope, $timeout, Authentication, Ratings) {
		var timeout = 1000;

		$scope.authentication = Authentication;
		$scope.rating = 5;
		$scope.isReadonly = true;

		$scope.rateFunction = function(newRating) {
			var level = $scope.level,
				rating;

			$scope.rating = newRating;

			rating = level.ratings.filter(function(rating) {
				return rating.user === $scope.authentication.user._id;
			});

			if (rating) {
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
			Ratings.update({ _id: rating._id, user: $scope.authentication.user._id, rating: $scope.rating }, function() {
				console.log('hi');
			});
		};
	}]);