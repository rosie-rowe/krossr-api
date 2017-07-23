import SignInController from './SignInController';

'use strict';

/** Sign-in popup */

export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        bindToController: true,
        controller: SignInController,
        controllerAs: SignInController.$controllerAs,
        templateUrl: 'modules/users/signIn/SignInView.html'
    }
}