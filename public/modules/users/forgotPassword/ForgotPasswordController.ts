'use strict';

export class ForgotPasswordController implements angular.IComponentController {
    static $controllerAs = 'forgotPasswordCtrl';
    static $name = 'ForgotPasswordController';

    static $inject = [
        '$http',
        '$stateParams',
        '$timeout'
    ];

    private invalid;
    private credentials;

    private closeAction: Function;

    private success: string;
    private error: string;
    
    private timeout: number = 1000;

    constructor(
        private $http: angular.IHttpService,
        private $stateParams: any,
        private $timeout: angular.ITimeoutService
    ) {

    }

    $onInit() {
        this.invalid = this.$stateParams['invalid'];
    }

    private clearForm() {
        this.credentials = null;
    }

    // Submit forgotten password account id
    askForPasswordReset() {
        this.success = this.error = null;

        this.$http.post('/auth/forgot', this.credentials).then((response: any) => {
            // Show user success message and clear form
            this.clearForm();
            this.success = response.data.message;

            this.$timeout(() => {
                this.closeAction();
            }, this.timeout);
        }).catch((response: any) => {
            // Show user error message and clear form
            this.clearForm();
            this.error = response.data.message;

            this.$timeout(() => {
                this.error = null;
            }, this.timeout);
        });
    };
}