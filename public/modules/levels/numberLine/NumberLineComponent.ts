import NumberLineController from './NumberLineController';

'use strict';

export default function () {
	return {
		bindings: {
			index: '<',
			orientation: '@',
			gameMatrix: '<',
			goalMatrix: '<'
		},
		bindToController: true,
		controller: NumberLineController,
		controllerAs: NumberLineController.$controllerAs,
		templateUrl: 'modules/levels/numberLine/NumberLineView.html'
	}
}