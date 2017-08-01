'use strict';

/**
 * This should handle all interaction with the user information available to the client
 */
export class AuthenticationService {
    static $name = 'Authentication';

    static $inject = [
        '$log',
        '$window'
    ];

    constructor(
        private $log: angular.ILogService,
        private $window: angular.IWindowService
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