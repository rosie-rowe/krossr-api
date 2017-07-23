'use strict';

export default class ForgotPasswordController implements angular.IComponentController {
    static $controllerAs = 'forgotPasswordCtrl';
    static $name = 'ForgotPasswordController';

    static $inject = [
        '$http',
        '$stateParams'
    ];

    private invalid;
    private credentials;

    private success;
    private error;

    constructor(
        private $http: angular.IHttpService,
        private $stateParams: any
    ) {

    }

    $onInit() {
        this.invalid = this.$stateParams['invalid'];
    }

    // Submit forgotten password account id
    askForPasswordReset() {
        this.success = this.error = null;

        this.$http.post('/auth/forgot', this.credentials).then((response: any) => {
            // Show user success message and clear form
            this.credentials = null;
            this.success = response.message;
        }).catch((response: any) => {
            // Show user error message and clear form
            this.credentials = null;
            this.error = response.message;
        });
    };
}