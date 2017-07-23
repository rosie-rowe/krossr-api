export function levelsResource($resource) {
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