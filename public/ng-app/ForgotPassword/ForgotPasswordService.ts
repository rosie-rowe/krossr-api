import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    constructor(private httpClient: HttpClient) {

    }

    sendForgotPasswordRequest(username: string) {
        return this.httpClient.post('auth/forgot', { username }).toPromise();
    }
}