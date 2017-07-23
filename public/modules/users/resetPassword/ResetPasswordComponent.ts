'use strict';

/** Screen to reset password */

export default class ResetPasswordComponent implements angular.IComponentOptions {
    static $name = 'resetPassword';
    controller = 'ResetPasswordController';
    controllerAs = 'resetPasswordCtrl';
    templateUrl = 'modules/users/resetPassword/ResetPasswordView.html';
}