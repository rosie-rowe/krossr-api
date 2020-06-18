import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignOutService } from '../SignOut/SignOutService';
/** Popup to change email/password or log out */

@Component({
    selector: 'edit-profile',
    template: require('./EditProfileView.html')
})
export class EditProfileComponent {
    constructor(
        private matDialogRef: MatDialogRef<EditProfileComponent>,
        private signOutService: SignOutService
    ) {
    }

    close() {
        this.matDialogRef.close();
    }

    signout() {
        this.signOutService.signout().then(() => {
            this.close();
        });
    }
}