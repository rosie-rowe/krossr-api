/// <reference path="../authentication/AuthenticationService.d.ts" />

'use strict';

class SignUpController implements angular.IComponentController {
    static $controllerAs = 'signUpCtrl';
    static $name = 'SignUpController';

    static $inject = [
        '$http',
        '$timeout',
        'Authentication'
    ];

    private credentials;
    private closeAction: Function;
    private error: string;
    private minPasswordLength = 10;
    private timeout: number = 1000;

    constructor(
        private $http: angular.IHttpService,
        private $timeout: angular.ITimeoutService,
        private Authentication: IAuthenticationService
    ) {}

    signup() {
        this.$http.post('/auth/signup', this.credentials).then((response) => {
            // If successful we assign the response to the global user model
            this.Authentication.user = response.data;
            this.closeAction();
        }).catch((response) => {
            this.error = response.message;

            this.$timeout(() => {
                this.error = null;
            }, this.timeout);
        });
    };
}

angular.module('users').controller(SignUpController.$name, SignUpController)