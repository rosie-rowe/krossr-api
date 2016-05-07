'use strict';

/* Sign-in popup */

angular.module('core').directive('signIn', function() {
    return {
        scope: true,
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl'
    };
});