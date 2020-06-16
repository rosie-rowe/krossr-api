import { Inject, Injectable } from "@angular/core";

/**
 * This should handle all interaction with the user information available to the client
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    static $name = 'Authentication';

    constructor(
        @Inject('window') private $window: any
    ) {
        this.signIn(this.$window.user);
    }

    private _user;

    /** Accessed directly from the templates for user info */
    get user() {
        return this._user;
    }

    /** Set the user object */
    public signIn(user) {
        this._user = user;
    }

    /** Signing in a null user is the same thing as signing out.*/
    public signOut() {
        this.signIn(null);
    }
}