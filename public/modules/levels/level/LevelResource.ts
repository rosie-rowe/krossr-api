export function LevelResource($resource) {
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