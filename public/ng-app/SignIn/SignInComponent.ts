import { AuthenticationService } from '../Authentication/AuthenticationService'
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { SignInService } from './SignInService';

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
        private signInService: SignInService
    ) {}

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.username = new FormControl('');
        this.password = new FormControl('');
    }

    close() {
        this.matDialogRef.close();
    }

    openForgotPassword() {
        this.close();
        // TODO
        // this.componentDialogService.open('forgot-password', { username: this.credentials.username });
    }

    signin() {
        this.signInService.signIn(this.username.value, this.password.value).then(() => {
            this.close();
        }).catch((response: any) => {
            this.error = response.data.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        })
    }

    updateUsername(username: string) {
        this.username.setValue(username);
    }

    updatePassword(password: string) {
        this.password.setValue(password);
    }
}