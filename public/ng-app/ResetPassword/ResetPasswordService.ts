import { Injectable } from "@angular/core";
import { AuthenticationService } from "../Authentication/AuthenticationService";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    resetPassword(token: string, passwordDetails: { newPassword: string, verifyPassword: string }) {
        return this.httpClient.post(`auth/reset/${token}`, passwordDetails).toPromise().then((response) => {
            return this.authenticationService.signIn(response);
        });
    }
}