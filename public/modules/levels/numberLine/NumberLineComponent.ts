/// <reference path="../point/Point.d.ts" />
/// <reference path="./NumberLineController.ts" />

'use strict';

class NumberLineComponent implements angular.IComponentOptions {
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

angular.module('levels').component('numberLine', new NumberLineComponent());