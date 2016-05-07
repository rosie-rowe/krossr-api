'use strict';

/* Forgot password popup */

angular.module('core').directive('forgotPassword', function() {
    return {
        scope: true,
        controller: 'PasswordController',
        controllerAs: 'pwdCtrl'
    };
});