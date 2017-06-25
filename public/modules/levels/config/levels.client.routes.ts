'use strict';

angular.module('levels').config(['$stateProvider', function($stateProvider: angular.ui.IStateProvider) {
    let levelTemplateUrl = 'modules/levels/level/index.html';

    $stateProvider
        .state('level', {
            url: '/level/:levelId',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'view'
            }
        })
        .state('create-level', {
            url: '/level/new',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'new'
            }
        })
        .state('edit-level', {
            url: '/level/:levelId/edit',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'edit'
            }
        });
}]);