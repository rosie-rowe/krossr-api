/// <reference path="./LevelSelectService.d.ts" />

'use strict';

class LevelSelectService implements ILevelSelectService {
    static $name = 'levelSelectService';

    static $inject = [
        'ngDialog'
    ]

    constructor(
       private ngDialog 
    ) {

    }

    openLevelSelect() {
        this.ngDialog.open({
			template: '<level-select close-action="closeThisDialog()"></level-select>',
			plain: true
		})
    }
}

angular.module('levels').service(LevelSelectService.$name, LevelSelectService);