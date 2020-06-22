import { AuthenticationService } from '../Authentication/AuthenticationService'
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { SignInService } from './SignInService';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPasswordComponent';

/** Sign-in popup */
@Component({
    selector: 'sign-in',
    template: require('./SignInView.html')
})
export class SignInComponent implements OnInit {
    public formGroup: FormGroup;
    public username: FormControl;
    public password: FormControl;

    private error: string;
    private timeout: number = 1000;

    constructor(
        private Authentication: AuthenticationService,
        private matDialogRef: MatDialogRef<SignInComponent>,
        private matDialog: MatDialog,
        private signInService: SignInService
    ) {}

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.username = new FormControl('');
        this.password = new FormControl('');
        this.formGroup.addControl('username', this.username);
        this.formGroup.addControl('password', this.password);
    }

    close() {
        this.matDialogRef.close();
    }

    openForgotPassword() {
        this.close();
        this.matDialog.open(ForgotPasswordComponent, {
            data: {
                username: this.username.value
            }
        });
    }

    signIn() {
        this.signInService.signIn(this.username.value, this.password.value).then(() => {
            this.close();
        }).catch((response: any) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        })
    }

    signInButtonText() {
        return this.error || 'Sign In';
    }

    updateUsername(username: string) {
        this.username.setValue(username);
    }

    updatePassword(password: string) {
        this.password.setValue(password);
    }
}