import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./UserService";

@Component({
    selector: 'update-user',
    template: require('./UpdateUserView.html')
})
export class UpdateUserComponent implements OnInit{
    public success: boolean;
    public error: string;

    public formGroup: FormGroup;
    public emailFormControl: FormControl;
    
    private timeout = 1000;

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.formGroup.addControl('email', this.emailFormControl);
    }

    updateUser() {
        this.success = this.error = null;

        this.userService.updateUser(this.emailFormControl.value).then(() => {
            this.success = true;
            
            setTimeout(() => {
                this.success = false;
            }, this.timeout)
        }).catch(response => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout);
        });
    }

    updateUserButtonText() {
        if (this.success) {
            return 'Email Saved';
        }

        return this.error || 'Save Email Address';
    }

    updateEmail(email: string) {
        this.emailFormControl.setValue(email);
    }
}