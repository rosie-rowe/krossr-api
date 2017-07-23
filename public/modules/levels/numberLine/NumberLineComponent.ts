import NumberLineController from './NumberLineController';

'use strict';

export default class NumberLineComponent implements angular.IComponentOptions {
	static $name = 'numberLine';
	controller = 'NumberLineController';
	controllerAs = 'numLineCtrl';
	templateUrl = 'modules/levels/numberLine/NumberLineView.html';

	bindings = {
		index: '<',
		orientation: '@',
		gameMatrix: '<',
		goalMatrix: '<'
	};

	bindToController = true;

	constructor(

	) {
	}
}