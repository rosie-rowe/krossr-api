// Init the application configuration module for AngularJS application
export var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Krossr';
	var applicationModuleVendorDependencies = [
		'ngAnimate',
		'ui.router',
		'ui.router.upgrade'
	];

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies
	};
})();