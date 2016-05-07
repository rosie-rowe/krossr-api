'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', '$timeout', 'Users', 'Authentication',
	function($scope, $http, $location, $timeout, Users, Authentication) {
		var timeout = 1000;
		$scope.authentication = Authentication;
		$scope.success = {};
		$scope.error = {};
		$scope.passwordDetails = {};
		$scope.minPasswordLength = 10;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Update a user profile
		this.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success.username = $scope.error.username = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success.username = true;
					Authentication.user = response;

					$timeout(function() {
						$scope.success.username = false;
					}, timeout)
				}, function(response) {
					$scope.error.username = response.data.message;

					$timeout(function() {
						$scope.error.password = null;
					}, timeout);
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		this.changeUserPassword = function() {
			$scope.success.password = $scope.error.password = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success.password = true;
				$scope.passwordDetails = null;

				$timeout(function() {
					$scope.success.password = null;
				}, timeout);
			}).error(function(response) {
				$scope.error.password = response.message;

				$timeout(function() {
					$scope.error.password = null;
				}, timeout);
			});
		};

        this.signout = function() {
            $http.post('/auth/signout').success(function(response) {
                delete $scope.authentication.user;
            }).error(function(response) {

            });
        }
	}
]);
