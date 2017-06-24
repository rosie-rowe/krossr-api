'use strict';

angular.module('levels').config(['$stateProvider', function($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state('level', {
            url: '/level/:levelId',
            templateUrl: 'modules/levels/level/index.html',
            params: {
                mode: 'view'
            }
        });
}]);