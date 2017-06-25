'use strict';

/** Sign-in popup */

class SignUpComponent implements angular.IComponentOptions {
    static $name = 'signUp';
    bindToController = true;
    controller = 'SignUpController';
    controllerAs = 'signUpCtrl';
    templateUrl = 'modules/users/signUp/SignUpView.html';

    bindings = {
        closeAction: '&'
    }
}

angular.module('users').component(SignUpComponent.$name, new SignUpComponent());