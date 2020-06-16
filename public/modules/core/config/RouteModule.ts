export function routing($stateProvider, $urlRouterProvider) {
	// Redirect to home view when route not found
	$urlRouterProvider.otherwise('/');

	// Home state routing
	$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/index.client.view.html'
		});
}