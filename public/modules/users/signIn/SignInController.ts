'use strict';

class SignInController implements angular.IComponentController {
    static $controllerAs = 'signInCtrl';
    static $name = 'SignInController';

    static $inject = [
        '$http',
        '$timeout',
        'Authentication'
    ];

    private credentials;
    private closeAction: Function;
    private error: string;
    private timeout: number = 1000;

    constructor(
        private $http: angular.IHttpService,
        private $timeout: angular.ITimeoutService,
        private Authentication
    ) {}

    signin() {
        this.$http.post('/auth/signin', this.credentials).then((response) => {
            // If successful we assign the response to the global user model
            this.Authentication.user = response.data;
            this.closeAction();
        }).catch((response) => {
            this.error = response.message;

            this.$timeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}

angular.module('users').controller(SignInController.$name, SignInController)