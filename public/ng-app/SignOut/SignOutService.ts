import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../Authentication/AuthenticationService";

@Injectable({
    providedIn: 'root'
})
export class SignOutService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    signout(): Promise<void> {
        return this.httpClient.post('auth/signout', {}).toPromise().then(() => {
            return this.authenticationService.signOut();
        })
    }
}