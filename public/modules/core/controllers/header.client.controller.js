'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'Utils',
	function($scope, $state, Authentication, Menus, Utils) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = true;
		$scope.menu = Menus.getMenu('topbar');
		$scope.profileDropdown = {
			isShowing: false
		};
		$scope.$state = $state;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

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