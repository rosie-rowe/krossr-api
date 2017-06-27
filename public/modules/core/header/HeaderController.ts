/// <reference path="../../core/componentDialog/IComponentDialogService.d.ts" />
/// <reference path="../../users/authentication/AuthenticationService.d.ts" />

'use strict';

class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'Authentication',
		'componentDialogService',
	]

	constructor(
		private Authentication: IAuthenticationService,
		private componentDialogService: IComponentDialogService,
	) {

	}

	openEditProfile() {
		this.componentDialogService.open('edit-profile');
	}

	openHelp() {
		this.componentDialogService.open('help');
	}

	openLevelSelect() {
		this.componentDialogService.open('level-select');
	}

	openSignIn() {
		this.componentDialogService.open('sign-in');
	}

	openSignUp() {
		this.componentDialogService.open('sign-up');
	}
}

angular.module('core').controller(HeaderController.$name, HeaderController);