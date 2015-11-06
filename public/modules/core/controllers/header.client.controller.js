'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$timeout', 'Authentication', 'Menus', 'Utils', 'ngDialog',
	function($scope, $state, $timeout, Authentication, Menus, Utils, ngDialog) {
		$scope.authentication = Authentication;
		$scope.menu = Menus.getMenu('topbar');
		$scope.profileDropdown = {
			isShowing: false
		};
		$scope.$state = $state;
		$scope.signInIsShowing = false;
		$scope.isCollapsed = true;

		$scope.toggleCollapsed = function(onlyToggleIfCollapsed) {
			var currentState = $scope.isCollapsed;

			if (onlyToggleIfCollapsed) {
				$scope.isCollapsed = currentState ? !currentState : currentState;
			} else {
				$scope.isCollapsed = !currentState;
			}
		}

		$scope.toggleShowing = function(item) {
			item.isShowing = !item.isShowing;
		};
	}
]);