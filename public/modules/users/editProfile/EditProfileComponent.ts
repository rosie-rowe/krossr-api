'use strict';

/** Popup to change email/password or log out */

class EditProfileComponent implements angular.IComponentOptions {
    static $name = 'editProfile';
    controller = 'EditProfileController';
    controllerAs = 'editProfileCtrl';
    templateUrl = 'modules/users/editProfile/EditProfileView.html';

    bindings = {
        closeAction: '&'
    }
}

angular.module('users').component(EditProfileComponent.$name, new EditProfileComponent());