/// <reference path="../../levels/utils/Utils.d.ts" />
/// <reference path="../../levels/levelSelect/LevelSelectService.d.ts" />
/// <reference path="../../users/authentication/AuthenticationService.d.ts" />

'use strict';

class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'$scope',
		'$state',
		'$timeout',
		'Authentication',
		'componentDialogService',
		'levelSelectService',
		'ngDialog',
		'Utils'
	]

	constructor(
		private $scope: angular.IScope,
		private $state: angular.ui.IStateService,
		private $timeout: angular.ITimeoutService,
		private Authentication: IAuthenticationService,
		private componentDialogService: IComponentDialogService,
		private levelSelectService: ILevelSelectService,
		private ngDialog,
		private Utils: IUtils
	) {

	}

	openEditProfile() {
		this.ngDialog.open({
			plain: true,
			template: '<edit-profile close-action="closeThisDialog()"></edit-profile>'
		})
	}

	openHelp() {
		this.componentDialogService.open('help');
	}

	openLevelSelect() {
		this.levelSelectService.openLevelSelect();	
	}


	openSignIn() {
		this.ngDialog.open({
			plain: true,
			template: '<sign-in close-action="closeThisDialog()"></sign-in>'
		})	
	}

	openSignUp() {
		this.ngDialog.open({
			plain: true,
			template: '<sign-up close-action="closeThisDialog()"></sign-up>'
		})
	}
}

angular.module('core').controller(HeaderController.$name, HeaderController);