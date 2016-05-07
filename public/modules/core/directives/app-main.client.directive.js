'use strict';

/* Wrapper for entire app */

angular.module('core').directive('appMain', function() {
    return {
        scope: true,
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
    };
});