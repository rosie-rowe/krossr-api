'use strict';

//Levels service used to communicate Ratings REST endpoints
angular.module('levels').factory('Ratings', ['$resource',
	function($resource) {
		return $resource('ratings/:ratingId/:levelId', { ratingId: '@_id', levelId: '@_level' },
		{
			update: {
				method: 'PUT'
			},
			get: {
				isArray: true
			}
		});
	}
]);