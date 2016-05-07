'use strict';

/* Forgot password popup */

angular.module('core').directive('resetPassword', function() {
    return {
        scope: true,
        controller: 'PasswordController',
        controllerAs: 'pwdCtrl'
    };
});