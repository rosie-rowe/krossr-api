/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../typings/point.d.ts" />
/// <reference path="../controllers/number-line.client.controller.ts" />

'use strict';

class NumberLineDirective implements angular.IDirective {
	public controller: any;
	public controllerAs: string;
	public templateUrl: string;

	constructor() {
		this.controller = ['$scope', '$timeout', 'Utils', NumberLineController];
		this.controllerAs = 'numLineCtrl';
		this.templateUrl = 'modules/levels/views/number-line.client.view.html';
	}
}

angular.module('levels').directive('numberLine', () => { return new NumberLineDirective() });