/** Popup to change email/password or log out */

export class ForgotPasswordComponent implements angular.IComponentOptions {
    static $name = 'forgotPassword';
    controller = 'ForgotPasswordController';
    controllerAs = 'forgotPasswordCtrl';
    templateUrl = 'modules/users/forgotPassword/ForgotPasswordView.html';

    bindings = {
        closeAction: '&',
        username: '@'
    }
}