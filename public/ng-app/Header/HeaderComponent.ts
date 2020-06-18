import { AuthenticationService } from '../Authentication/AuthenticationService'
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { HelpComponent } from '../Help/HelpComponent';
import { EditProfileComponent } from '../EditProfile/EditProfileComponent';
import { SignInComponent } from '../SignIn/SignInComponent';
import { SignUpComponent } from '../SignUp/SignUpComponent';

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

	openEditProfile() {
		this.matDialog.open(EditProfileComponent);
	}

	openHelp() {
		this.matDialog.open(HelpComponent);
	}

	openLevelSelect() {
        this.matDialog.open(LevelSelectComponent);
	}

	openSignIn() {
		this.matDialog.open(SignInComponent);
	}

	openSignUp() {
		this.matDialog.open(SignUpComponent);
	}
}