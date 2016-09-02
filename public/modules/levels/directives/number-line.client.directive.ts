/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../typings/point.d.ts" />
'use strict';

class NumberLineDirective implements angular.IDirective {
	public controller: string;
	public controllerAs: string;
	public templateUrl: string;

	constructor() {
		this.controller = 'NumberLineController';
		this.controllerAs = 'numLineCtrl';
		this.templateUrl = 'modules/levels/views/number-line.client.view.html';
	}
}

angular.module('levels').directive('numberLine', () => { return new NumberLineDirective() });