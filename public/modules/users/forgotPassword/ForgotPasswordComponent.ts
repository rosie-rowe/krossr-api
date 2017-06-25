'use strict';

/** Popup to change email/password or log out */

class ForgotPasswordComponent implements angular.IComponentOptions {
    static $name = 'forgotPassword';
    controller = 'ForgotPasswordController';
    controllerAs = 'forgotPasswordCtrl';
    templateUrl = 'modules/users/forgotPassword/ForgotPasswordView.html';

    bindings = {
        closeAction: '&'
    }
}

angular.module('users').component(ForgotPasswordComponent.$name, new ForgotPasswordComponent());