'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'Utils', 'ngDialog',
	function($scope, $state, Authentication, Menus, Utils, ngDialog) {
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

		$scope.openHelp = function() {
			ngDialog.open({
				template: 'modules/core/views/help.client.view.html'
			});
		};

		$scope.toggleSignIn = function() {
			$scope.signInIsShowing = !$scope.signInIsShowing;
			$scope.signUpIsShowing = false;

			$scope.toggleCollapsed($scope.signInIsShowing);
		};

		$scope.toggleSignUp = function() {
			$scope.signUpIsShowing = !$scope.signUpIsShowing;
			$scope.signInIsShowing = false;

			$scope.toggleCollapsed($scope.signUpIsShowing);
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			Utils.setCurrentLevel();
			$scope.isCollapsed = true;
			$scope.signInIsShowing = false;
		});

		$scope.$watch(function() { return Utils.currentLevel; }, function(level) {
			$scope.level = level;
		});
	}
]);