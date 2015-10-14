'use strict';

angular.module('core').controller('HelpController', ['$scope', 'Authentication', 'Utils',
	function($scope, Authentication, Utils) {
		$scope.authentication = Authentication;
		
		$scope.flatten = Utils.flatten;

		$scope.level = {};
		$scope.level.layout =  [[true, true, true, true, true],
								[true, true, true, true, true],
								[true, true, true, true, true],
								[true, true, true, true, true],
								[true, true, true, true, true]];
	}
]);