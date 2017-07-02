import { IAuthenticationService } from '../authentication/IAuthenticationService'

'use strict';

class SignInController implements angular.IComponentController {
    static $controllerAs = 'signInCtrl';
    static $name = 'SignInController';

    static $inject = [
        '$http',
        '$scope',
        '$timeout',
        'Authentication',
        'ngDialog'
    ];

    private credentials;
    private closeAction: Function;
    private error: string;
    private timeout: number = 1000;

    constructor(
        private $http: angular.IHttpService,
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService,
        private Authentication: IAuthenticationService,
        private ngDialog
    ) {}

    $onInit() {}

    openForgotPassword() {
        this.closeAction();
        
        this.ngDialog.open({
            plain: true,
            template: '<forgot-password close-action="closeThisDialog()"></forgot-password>'
        });
    }

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