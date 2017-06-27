/// <reference path="../config.ts" />

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

// Setting ngDialog defaults
angular.module(ApplicationConfiguration.applicationModuleName).config(['ngDialogProvider',
	function(ngDialogProvider) {
		ngDialogProvider.setDefaults({
			closeByDocument: false,
			overlay: true,
			appendTo: '#main-section'
		});
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	// If it's not already defined, define a method to find the index of an object in an array.
	if (!Array.prototype.hasOwnProperty('indexOfObject')) {
		Array.prototype['indexOfObject'] = function(obj) {
            for(var i = 0; i < this.length; i++){
                if(angular.equals(this[i], obj)){
                    return i;
                }
            };
            return -1;
		}
	}

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});