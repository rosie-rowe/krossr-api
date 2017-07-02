import { IComponentDialogService } from '../../core/componentDialog/IComponentDialogService';
import { IAuthenticationService } from '../../users/authentication/IAuthenticationService'

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

	$onInit() {}

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