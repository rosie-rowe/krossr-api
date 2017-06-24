/// <reference path="../../levels/utils/Utils.d.ts" />
/// <reference path="../../levels/levelSelect/LevelSelectService.d.ts" />

'use strict';

class HeaderController implements angular.IComponentController {
	static $controllerAs = 'headerCtrl';
	static $name = 'HeaderController';	

	static $inject = [
		'$scope',
		'$state',
		'$timeout',
		'Authentication',
		'levelSelectService',
		'Menus',
		'Utils'
	]

	constructor(
		private $scope: angular.IScope,
		private $state: angular.ui.IStateService,
		private $timeout: angular.ITimeoutService,
		private Authentication,
		private levelSelectService: ILevelSelectService,
		private Menus,
		private Utils: IUtils
	) {

	}

	openLevelSelect() {
		this.levelSelectService.openLevelSelect();	
	}
}

angular.module('core').controller(HeaderController.$name, HeaderController);