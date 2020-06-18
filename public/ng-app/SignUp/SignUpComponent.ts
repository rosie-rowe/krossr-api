import { AuthenticationService } from '../Authentication/AuthenticationService'
import { Component, OnInit } from '@angular/core';
import { SignUpService } from './SignUpService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'sign-up',
    template: require('./SignUpView.html')
})
export class SignUpComponent implements OnInit {
    private error: string;
    private minPasswordLength = 10;
    private timeout: number = 1000;

    constructor(
        private matDialogRef: MatDialogRef<SignUpComponent>,
        private signUpService: SignUpService
    ) {}

    public formGroup: FormGroup;
    public username: FormControl;
    public email: FormControl;
    public password: FormControl;

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.username = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)])
        this.formGroup.addControl('username', this.username);
        this.formGroup.addControl('email', this.email);
        this.formGroup.addControl('password', this.password);
    }

    signup() {
        this.signUpService.signUp(this.username.value, this.email.value, this.password.value).then(() => {
            this.matDialogRef.close();
        }).catch((response) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    };

    updateUsername(username: string) {
        this.username.setValue(username);
    }

    updateEmail(email: string) {
        this.email.setValue(email);
    }

    updatePassword(password: string) {
        this.password.setValue(password);
    }
}