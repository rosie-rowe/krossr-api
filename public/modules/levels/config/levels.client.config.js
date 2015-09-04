'use strict';

// Configuring the Articles module
angular.module('levels').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Levels', 'levels', 'levels', '/levels(/create)?', true, undefined, 0, 'fa fa-folder');
	}
]);