import * as angular from 'angular'
import { Point } from '../point/Point'

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