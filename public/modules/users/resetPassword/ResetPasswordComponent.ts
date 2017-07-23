import ResetPasswordController from './ResetPasswordController';

'use strict';

/** Screen to reset password */
export default function() {
    return {
        controller: ResetPasswordController,
        controllerAs: ResetPasswordController.$controllerAs,
        templateUrl: 'modules/users/resetPassword/ResetPasswordView.html'
    }
}