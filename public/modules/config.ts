// Init the application configuration module for AngularJS application
export var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Krossr';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngAnimate',
		'ngCookies',
		'ngDialog',
		'ngLodash',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'ui.router.upgrade',
		'ui.utils',
		'debounce',
		'templates-main'
	];

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies
	};
})();