'use strict';

/* Sign-up popup */

angular.module('core').directive('signUp', function() {
    return {
        scope: true,
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl'
    };
});