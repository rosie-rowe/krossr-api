'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/levels');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/levels',
			templateUrl: 'modules/levels/views/list-levels.client.view.html'
		});
	}
]);