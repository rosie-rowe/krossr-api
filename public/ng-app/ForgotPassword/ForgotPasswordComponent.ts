/** Popup to change email/password or log out */

import { Input, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ForgotPasswordService } from "./ForgotPasswordService";

@Component({
    selector: 'forgot-password',
    template: require('./ForgotPasswordView.html')
})
export class ForgotPasswordComponent {
    // TODO pass in from url if present
    @Input() public invalid = false;

    public username: string;

    private success: string;
    private error: string;
    
    private timeout: number = 1000;

    public formGroup: FormGroup;
    public usernameFormControl: FormControl;

    constructor(
        private matDialogRef: MatDialogRef<ForgotPasswordComponent>,
        private forgotPasswordService: ForgotPasswordService,
        @Inject(MAT_DIALOG_DATA) public data: { username: string }
    ) {
    }

    close() {
        this.matDialogRef.close();
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.usernameFormControl = new FormControl(this.data.username, [Validators.required]);
        this.formGroup.addControl('username', this.usernameFormControl);
    }

    private clearForm() {
        this.updateUsername('');
    }

    // Submit forgotten password account id
    askForPasswordReset() {
        this.success = this.error = null;

        this.forgotPasswordService.sendForgotPasswordRequest(this.usernameFormControl.value).then((response: any) => {
            // Show user success message and clear form
            this.clearForm();
            this.success = response.message;

            setTimeout(() => {
                this.close();
            }, this.timeout);
        }).catch((response: any) => {
            // Show user error message and clear form
            this.clearForm();
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    };

    updateUsername(username: string) {
        this.usernameFormControl.setValue(username);
    }
}