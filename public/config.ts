import * as angular from 'angular';

'use strict';

// Init the application configuration module for AngularJS application
export var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Krossr';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngCookies', 'ngDialog', 'ngTouch',  'ngSanitize',  'ui.router', 'ui.utils', 'debounce', 'templates-main'];

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies
	};
})();