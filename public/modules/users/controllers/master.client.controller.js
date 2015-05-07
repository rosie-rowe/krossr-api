'use strict';

angular.module('users').controller('MasterController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');
	}
]);