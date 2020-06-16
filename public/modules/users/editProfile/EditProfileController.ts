import { AuthenticationService } from '../../../ng-app/Authentication/AuthenticationService';

export class EditProfileController implements angular.IComponentController {
    static $controllerAs = 'editProfileCtrl';
    static $name = 'EditProfileController';

    static $inject = [
       '$scope',
       '$http',
       '$location',
       '$timeout',
       'Users',
       'Authentication'
    ];

    private closeAction: Function;

    private minPasswordLength: number = 10;
    private submitted: boolean;
    private timeout: number = 1000;
    
    private passwordDetails: any = {};
    private success: any = {};
    private error: any = {};

    private user;

    constructor(
        private $scope: angular.IScope,
        private $http: angular.IHttpService,
        private $location: angular.ILocationService,
        private $timeout: angular.ITimeoutService,
        private Users,
        private Authentication: AuthenticationService
    ) {

    }

    $onInit() {}

    /** Change user password */
    changeUserPassword() {
        this.success.password = this.error.password = null;

        this.$http.post('/users/password', this.passwordDetails).then((response) => {
            // If successful show success message and clear form
            this.success.password = true;
            this.passwordDetails = null;

            this.$timeout(() => {
                this.success.password = null;
            }, this.timeout);
        }).catch((response) => {
            this.error.password = response.message;

            this.$timeout(function() {
                this.error.password = null;
            }, this.timeout);
        });
    };

    signout() {
        this.$http.post('/auth/signout', {}).then((response) => {
            this.Authentication.signOut();
            this.closeAction();
        }).catch((response) => {

        });
    }

    /** Update a user profile */
    updateUserProfile(isValid) {
        if (isValid){
            this.success.username = this.error.username = null;
            var user = new this.Users(this.Authentication.user);

            user.$update((response) => {
                this.success.username = true;
                this.Authentication.signIn(response);

                this.$timeout(() => {
                    this.success.username = false;
                }, this.timeout)
            }, (response) => {
                this.error.username = response.data.message;

                this.$timeout(function() {
                    this.error.password = null;
                }, this.timeout);
            });
        } else {
            this.submitted = true;
        }
    };
}