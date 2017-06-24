/// <reference path="../../levels/utils/Utils.d.ts" />

'use strict';

class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'$scope',
		'$state',
		'$timeout',
		'Authentication',
		'Menus',
		'Utils',
		'ngDialog'
	]

	constructor(
		private $scope: angular.IScope,
		private $state: angular.ui.IStateService,
		private $timeout: angular.ITimeoutService,
		private Authentication,
		private Menus,
		private Utils: IUtils,
		private ngDialog: any
	) {

	}

	openLevelSelect() {
		this.ngDialog.open({
			template: '<level-select close-action="closeThisDialog()"></level-select>',
			plain: true
		})
	}
}

angular.module('core').controller(HeaderController.$name, HeaderController);