// Users service used for communicating with the users REST endpoint
export function usersService($resource) {
	return $resource('users', {}, {
		update: {
			method: 'PUT'
		}
	});
}