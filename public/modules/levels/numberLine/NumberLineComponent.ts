import NumberLineController from './NumberLineController';
import { Point } from '../point/Point'

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