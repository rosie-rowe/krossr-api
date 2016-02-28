'use strict';

//Levels service used to communicate Levels REST endpoints
angular.module('levels').factory('Levels', ['$resource',
	function($resource) {
		return $resource('levels/:levelId', { levelId: '@id'
		}, {
			update: {
				method: 'PUT'
			},
			query: {
				isArray: false
			}
		});
	}
]);