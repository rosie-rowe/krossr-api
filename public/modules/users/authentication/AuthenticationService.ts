'use strict';

export default class AuthenticationService implements krossr.users.authentication.IAuthenticationService {
    static $name = 'Authentication';

    static $inject = [
        '$window'
    ];

    constructor(
        private $window: angular.IWindowService
    ) {
        this.user = this.$window.user;
    }

    private _data: any = {};

    get user() {
        return this._data.user;
    }

    set user(user) {
        this._data.user = user;
    }
}