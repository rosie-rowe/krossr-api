import { AuthenticationService } from '../authentication/AuthenticationService'

export class ResetPasswordController implements angular.IComponentController {
    static $controllerAs = 'resetPasswordCtrl';
    static $name = 'ResetPasswordController';

    static $inject = [
        '$http',
        '$location',
        '$stateParams',
        'Authentication'
    ];

    private invalid;
    private credentials;
    private passwordDetails;

    private success;
    private error;

    constructor(
        private $http: angular.IHttpService,
        private $location: angular.ILocationService,
        private $stateParams: any,
        private Authentication: AuthenticationService
    ) {

    }

    $onInit() {
    }

  	// Change user password
    resetUserPassword() {
        this.success = this.error = null;

        this.$http.post('/auth/reset/' + this.$stateParams.token, this.passwordDetails).then((response) => {
            // If successful show success message and clear form
            this.passwordDetails = null;

            // Attach user profile
            this.Authentication.signIn(response.data);

            // And redirect to the home page
            this.$location.path('/');
        }).catch((response) => {
            this.error = response.data.message;
        });
    };
}