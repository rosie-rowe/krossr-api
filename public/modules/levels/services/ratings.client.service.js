'use strict';

//Levels service used to communicate Ratings REST endpoints
angular.module('levels').factory('Ratings', ['$resource',
	function($resource) {
		return $resource('ratings/:ratingId', { ratingId: '@_id' },
		{
			update: {
				method: 'PUT'
			}
		});
	}
]);