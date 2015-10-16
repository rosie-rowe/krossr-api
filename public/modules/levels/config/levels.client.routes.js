'use strict';

//Setting up route
angular.module('levels').config(['$stateProvider',
	function($stateProvider) {
		// Levels state routing
		$stateProvider.
		state('createLevel', {
			url: '/levels/create',
			templateUrl: 'modules/levels/views/create-level.client.view.html'
		}).
		state('editLevel', {
			url: '/levels/:levelId/edit',
			templateUrl: 'modules/levels/views/edit-level.client.view.html'
		});
	}
]);