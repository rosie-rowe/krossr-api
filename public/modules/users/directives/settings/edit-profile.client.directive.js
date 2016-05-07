'use strict';

/* Forgot password popup */

angular.module('core').directive('editProfile', function() {
    return {
        scope: true,
        controller: 'SettingsController',
        controllerAs: 'settingsCtrl'
    };
});