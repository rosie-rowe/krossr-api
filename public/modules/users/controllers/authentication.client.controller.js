'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', '$timeout', 'Authentication',
	function($scope, $http, $location, $timeout, Authentication) {
		var timeout = 1000;

		$scope.authentication = Authentication;
		$scope.minPasswordLength = 10;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/levels');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// Typeof check makes tests happy
				if (typeof $scope.closeThisDialog === 'function') {
					$scope.closeThisDialog();
				}

				// And redirect to the index page
				$location.path('/levels');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// Typeof check makes tests happy
				if (typeof $scope.closeThisDialog === 'function') {
					$scope.closeThisDialog();
				}
			}).error(function(response) {
				$scope.error = response.message;

				$timeout(function() {
					$scope.error = null;
				}, timeout);
			});
		};
	}
]);