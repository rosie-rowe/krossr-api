import { AuthenticationService } from '../Authentication/AuthenticationService'
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { HelpComponent } from '../Help/HelpComponent';

@Component({
    selector: 'krossr-header',
    styles: [require('./HeaderStyles.less')],
    template: require('./HeaderView.html')
})
export class HeaderComponent {
    static $name = 'krossrHeader';

	constructor(
		private Authentication: AuthenticationService,
        private matDialog: MatDialog
	) {

    }

    // LOTS TODO

	openEditProfile() {
		// this.componentDialogService.open('edit-profile');
	}

	openHelp() {
		this.matDialog.open(HelpComponent);
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