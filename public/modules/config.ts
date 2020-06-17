// Init the application configuration module for AngularJS application
export var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Krossr';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngAnimate',
		'ngCookies',
		'ngTouch',
		'ui.router',
		'ui.router.upgrade',
		'debounce',
		'templates-main'
	];

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies
	};
})();