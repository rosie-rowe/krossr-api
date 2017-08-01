'use strict';

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
		template: '<forgot-password></forgot-password>'
	}).
	state('reset', {
		url: '/password/reset/:token',
		template: '<reset-password></reset-password>'
	});
}