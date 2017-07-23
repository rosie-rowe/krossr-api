import SignUpController from './SignUpController';

'use strict';

var $name = 'signUp';

/** Sign-in popup */
export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        bindToController: true,
        controller: SignUpController,
        controllerAs: SignUpController.$controllerAs,
        templateUrl: 'modules/users/signUp/SignUpView.html'
    }
}