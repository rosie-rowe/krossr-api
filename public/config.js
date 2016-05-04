'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Krossr';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngCookies', 'ngDialog', 'ngTouch',  'ngSanitize',  'ui.router', 'ui.utils', 'debounce'];

    // Only include template bundle as dependency in production
    if (process.env.NODE_ENV === 'production') {
        applicationModuleVendorDependencies.push('templates-main');
    }

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();