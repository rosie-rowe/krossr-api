import ForgotPasswordController from './ForgotPasswordController';

'use strict';

/** Popup to change email/password or log out */

export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        controller: ForgotPasswordController,
        controllerAs: ForgotPasswordController.$controllerAs,
        templateUrl: 'modules/users/forgotPassword/ForgotPasswordView.html'
    }
}