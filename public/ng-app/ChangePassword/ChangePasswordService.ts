import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    constructor(private httpClient: HttpClient) {
    }

    changePassword(currentPassword, newPassword, verifyPassword) {
        return this.httpClient.post('users/password', {
            currentPassword,
            newPassword,
            verifyPassword
        }).toPromise();
    }
}