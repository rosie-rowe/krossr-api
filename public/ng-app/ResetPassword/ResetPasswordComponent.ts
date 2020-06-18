import { AuthenticationService } from '../Authentication/AuthenticationService'
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './ResetPasswordService';

@Component({
    selector: 'reset-password',
    template: require('./ResetPasswordView.html')
})
export class ResetPasswordComponent implements OnInit {
    static $name = 'resetPassword';

    @Input() token: string;

    private success;
    private error;

    public formGroup: FormGroup;
    public newPasswordFormControl: FormControl;
    public verifyPasswordFormControl: FormControl;

    constructor(
        private resetPasswordService: ResetPasswordService
    ) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        // TODO length validation
        this.newPasswordFormControl = new FormControl('', [Validators.required]);
        this.verifyPasswordFormControl = new FormControl('', [Validators.required]);
        this.formGroup.addControl('newPassword', this.newPasswordFormControl);
        this.formGroup.addControl('verifyPassword', this.verifyPasswordFormControl);
    }

  	// Change user password
    resetUserPassword() {
        this.success = this.error = null;

        this.resetPasswordService.resetPassword(this.token, {
            newPassword: this.newPasswordFormControl.value,
            verifyPassword: this.verifyPasswordFormControl.value
        }).then(() => {
            this.clearForm();
            this.success = `Password updated!`;
        }).catch((response) => {
            this.error = response.error.message;
        });
    };

    private clearForm() {
        this.updateNewPassword('');
        this.updateVerifyPassword('');
    }

    private updateNewPassword(newPassword: string) {
        this.newPasswordFormControl.setValue(newPassword);
    }

    private updateVerifyPassword(verifyPassword: string) {
        this.verifyPasswordFormControl.setValue(verifyPassword);
    }
}