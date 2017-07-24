import { IComponentDialogService } from '../../core/componentDialog/IComponentDialogService';

'use strict';

export default class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'Authentication',
		'componentDialogService',
	]

	constructor(
		private Authentication: krossr.users.authentication.IAuthenticationService,
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