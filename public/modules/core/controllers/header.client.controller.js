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

		$scope.openEditProfile = function() {
			ngDialog.open({
				template: 'modules/users/views/settings/edit-profile.client.view.html'
			});
		}

		$scope.openHelp = function() {
			ngDialog.open({
				template: 'modules/core/views/help.client.view.html'
			});
		};

		$scope.openSignIn = function() {
			ngDialog.open({
				template: 'modules/users/views/authentication/signin.client.view.html'
			});
		};

		$scope.openSignUp = function() {
			ngDialog.open({
				template: 'modules/users/views/authentication/signup.client.view.html'
			});
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