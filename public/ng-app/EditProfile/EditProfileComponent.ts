import { AuthenticationService } from '../Authentication/AuthenticationService';
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
        public Authentication: AuthenticationService,
        private signOutService: SignOutService
    ) {
    }

    private minPasswordLength: number = 10;
    private submitted: boolean;
    private timeout: number = 1000;
    
    private passwordDetails: any = {};
    private success: any = {};
    private error: any = {};
    
    private user;

    close() {
        this.matDialogRef.close();
    }

    /** Change user password */
    changeUserPassword() {
        // TODO
        // this.success.password = this.error.password = null;

        // this.$http.post('/users/password', this.passwordDetails).then((response) => {
        //     // If successful show success message and clear form
        //     this.success.password = true;
        //     this.passwordDetails = null;

        //     this.$timeout(() => {
        //         this.success.password = null;
        //     }, this.timeout);
        // }).catch((response) => {
        //     this.error.password = response.message;

        //     this.$timeout(function() {
        //         this.error.password = null;
        //     }, this.timeout);
        // });
    };

    signout() {
        this.signOutService.signout().then(() => {
            this.close();
        });
    }

    /** Update a user profile */
    updateUserProfile(isValid) {
        // TODO
        // if (isValid){
        //     this.success.username = this.error.username = null;
        //     var user = new this.Users(this.Authentication.user);

        //     user.$update((response) => {
        //         this.success.username = true;
        //         this.Authentication.signIn(response);

        //         this.$timeout(() => {
        //             this.success.username = false;
        //         }, this.timeout)
        //     }, (response) => {
        //         this.error.username = response.data.message;

        //         this.$timeout(function() {
        //             this.error.password = null;
        //         }, this.timeout);
        //     });
        // } else {
        //     this.submitted = true;
        // }
    };
}