import * as angular from 'angular';

'use strict';

/**
 * Wrapper for ngDialog to easily allow dialogs to be defined as components
 */

export class ComponentDialogService {
    static $name = 'componentDialogService';

    static $inject = [
        'lodash',
        'ngDialog'
    ];

    constructor(
        private lodash: _.LoDashStatic,
        private ngDialog: angular.dialog.IDialogService
    ) {

    }

    private defaultOptions: angular.dialog.IDialogOptions = {
        plain: true
    };

    /**
     * Converts a 1-level deep object consisting of attributes to give to a component dialog, e.g.
     * { thisIsAnAttribute: 'thisIsAValue' } => `this-is-an-attribute="thisIsAValue"`
     * @param obj 
     */
    private convertObjectToAttributes(obj: any) {
        let result = '';

        if (!obj) {
            return result;
        }

        let keys = Object.keys(obj);

        for (let i = 0, len = keys.length; i < len; i++) {
            let currentKey = keys[i];
            result += `${this.lodash.kebabCase(currentKey)}="${obj[currentKey]}" `;
        }

        return result;
    }

    private getDefaultOpenOptions(directiveName: string, data?: any): angular.dialog.IDialogOpenOptions {
        return angular.extend(this.defaultOptions, {
            controller: 'ComponentDialogController',
            controllerAs: 'componentDialogCtrl',
            template: this.getTemplate(directiveName, data)
        });
    }

    private getDefaultOpenConfirmOptions(directiveName: string, data?: any): angular.dialog.IDialogOpenConfirmOptions {
        return angular.extend(this.defaultOptions, {
            template: this.getTemplate(directiveName, data)
        })
    }

    private getTemplate(directiveName: string, data?: any){
        return '<' + directiveName + ' close-action="closeThisDialog()"' + this.convertObjectToAttributes(data) + '>' + '</' + directiveName + '>';
    }

    open<TComponentAttributes>(directiveName: string, data?: TComponentAttributes): angular.dialog.IDialogOpenResult {
        let options = this.getDefaultOpenOptions(directiveName, data);

        return this.ngDialog.open(options);
    }

    openConfirm(directiveName: string): angular.IPromise<any> {
        let options = this.getDefaultOpenConfirmOptions(directiveName);

        return this.ngDialog.openConfirm(options);
    }
}