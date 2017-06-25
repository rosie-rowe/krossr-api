'use strict';

/** Screen to reset password */

class ResetPasswordComponent implements angular.IComponentOptions {
    static $name = 'resetPassword';
    controller = 'ResetPasswordController';
    controllerAs = 'resetPasswordCtrl';
    templateUrl = 'modules/users/resetPassword/ResetPasswordView.html';
}

angular.module('users').component(ResetPasswordComponent.$name, new ResetPasswordComponent());