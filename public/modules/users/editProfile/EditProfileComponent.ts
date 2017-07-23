import EditProfileController from './EditProfileController';

'use strict';

/** Popup to change email/password or log out */
export default function() {
    return {
        bindings: {
            closeAction: '&'
        },
        controller: EditProfileController,
        controllerAs: EditProfileController.$controllerAs,
        templateUrl: 'modules/users/editProfile/EditProfileView.html'
    }
}