'use strict';

/** Popup to change email/password or log out */

export default class EditProfileComponent implements angular.IComponentOptions {
    static $name = 'editProfile';
    controller = 'EditProfileController';
    controllerAs = 'editProfileCtrl';
    templateUrl = 'modules/users/editProfile/EditProfileView.html';

    bindings = {
        closeAction: '&'
    }
}