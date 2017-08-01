import { AuthenticationService } from '../authentication/AuthenticationService'
import { ComponentDialogService } from '../../core/componentDialog/ComponentDialogService';

'use strict';

export class SignInController implements angular.IComponentController {
    static $controllerAs = 'signInCtrl';
    static $name = 'SignInController';

    static $inject = [
        '$http',
        '$scope',
        '$timeout',
        'Authentication',
        'componentDialogService'
    ];

    private credentials;
    private closeAction: Function;
    private error: string;
    private timeout: number = 1000;

    constructor(
        private $http: angular.IHttpService,
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService,
        private Authentication: AuthenticationService,
        private componentDialogService: ComponentDialogService,
    ) {}

    $onInit() {}

    openForgotPassword() {
        this.closeAction();
        this.componentDialogService.open('forgot-password');
    }

    signin() {
        this.$http.post('/auth/signin', this.credentials).then((response) => {
            // If successful we assign the response to the global user model
            this.Authentication.signIn(response.data);
            this.closeAction();
        }).catch((response) => {
            this.error = response.data.message;

            this.$timeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}