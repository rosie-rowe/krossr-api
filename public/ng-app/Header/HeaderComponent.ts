import { AuthenticationService } from '../Authentication/AuthenticationService'
import { ComponentDialogService } from '../../modules/core/componentDialog/ComponentDialogService';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';

@Component({
    selector: 'krossr-header',
    styles: [require('./HeaderStyles.less')],
    template: require('./HeaderView.html')
})
export class HeaderComponent {
    static $name = 'krossrHeader';

	constructor(
		private Authentication: AuthenticationService,
        // private componentDialogService: ComponentDialogService,
        private matDialog: MatDialog
	) {

    }

    // LOTS TODO

	openEditProfile() {
		// this.componentDialogService.open('edit-profile');
	}

	openHelp() {
		// this.componentDialogService.open('help');
	}

	openLevelSelect() {
        this.matDialog.open(LevelSelectComponent);
	}

	openSignIn() {
		// this.componentDialogService.open('sign-in');
	}

	openSignUp() {
		// this.componentDialogService.open('sign-up');
	}
}