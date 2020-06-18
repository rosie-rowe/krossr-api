// Setting up route
export function routing($stateProvider) {
	// Users state routing
	$stateProvider.
	state('reset-invalid', {
		url: '/password/reset/invalid',
		params: {
			invalid: true
		},
		plain: true,
		template: (params) => `<forgot-password invalid="${params.invalid}"></forgot-password>`
	}).
	state('reset', {
		url: '/password/reset/:token',
		template: (params) => `<reset-password token="${params.token}"></reset-password>`
	});
}