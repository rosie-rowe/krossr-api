'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'Utils', 'ngDialog',
	function($scope, $state, Authentication, Menus, Utils, ngDialog) {
		$scope.authentication = Authentication;
		$scope.menu = Menus.getMenu('topbar');
		$scope.profileDropdown = {
			isShowing: false
		};
		$scope.$state = $state;

		$scope.toggleShowing = function(item) {
			item.isShowing = !item.isShowing;
		};

		$scope.openHelp = function() {
			ngDialog.open({
				template: 'modules/core/views/help.client.view.html'
			});
		};

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