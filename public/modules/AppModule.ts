import * as angular from 'angular';

import { ApplicationConfiguration } from './config';

import CoreModule from './core/CoreModule';
import { UrlService } from "@uirouter/core";

export function application() {
	let dependencies = ApplicationConfiguration.applicationModuleVendorDependencies.concat([
		CoreModule
	]);
	
	angular.module(ApplicationConfiguration.applicationModuleName, dependencies);
	
	// Setting HTML5 Location Mode
	angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.hashPrefix('!');
		}
	]);
	
	// Hybrid stuff, remove later TODO
	angular.module(ApplicationConfiguration.applicationModuleName).config(['$urlServiceProvider', ($urlService: UrlService) => {
		$urlService.deferIntercept();
	}]);

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
	});
}
