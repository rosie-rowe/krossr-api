'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'Utils',
	function($scope, $state, Authentication, Menus, Utils) {
		$scope.authentication = Authentication;
		$scope.menu = Menus.getMenu('topbar');
		$scope.profileDropdown = {
			isShowing: false
		};
		$scope.$state = $state;

		$scope.toggleShowing = function(item) {
			item.isShowing = !item.isShowing;
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			Utils.setCurrentLevel();
			$scope.isCollapsed = true;
		});

		$scope.$watch(function() { return Utils.currentLevel; }, function(level) {
			$scope.level = level;
		});
	}
]);