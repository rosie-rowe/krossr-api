/// <reference path="./IComponentDialogService.d.ts" />

'use strict';

/**
 * Wrapper for ngDialog to easily allow dialogs to be defined as components
 */

class ComponentDialogService implements IComponentDialogService {
    static $name = 'componentDialogService';

    static $inject = [
        'ngDialog'
    ];

    constructor(
        private ngDialog: angular.dialog.IDialogService
    ) {

    }

    private defaultOptions: angular.dialog.IDialogOptions = {
        plain: true
    };

    private getDefaultOpenOptions(directiveName: string): angular.dialog.IDialogOpenOptions {
        return angular.extend(this.defaultOptions, {
            template: this.getTemplate(directiveName)
        });
    }

    private getDefaultOpenConfirmOptions(directiveName: string): angular.dialog.IDialogOpenConfirmOptions {
        return angular.extend(this.defaultOptions, {
            template: this.getTemplate(directiveName)
        })
    }

    private getTemplate(directiveName: string, ...args: any[]){
        return '<' + directiveName + ' ' + JSON.stringify(args) + '>' + '</' + directiveName + '>';
    }

    open(directiveName: string) {
        let options = this.getDefaultOpenOptions(directiveName);

        return this.ngDialog.open(options);
    }

    openConfirm(directiveName: string) {
        let options = this.getDefaultOpenConfirmOptions(directiveName);

        return this.ngDialog.openConfirm(options);
    }
}

angular.module('core').service(ComponentDialogService.$name, ComponentDialogService);