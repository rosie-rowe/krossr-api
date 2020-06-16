import { AuthenticationService } from '../../users/authentication/AuthenticationService'
import { ComponentDialogService } from '../../core/componentDialog/ComponentDialogService';

export class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'Authentication',
		'componentDialogService',
	]

	constructor(
		private Authentication: AuthenticationService,
		private componentDialogService: ComponentDialogService,
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