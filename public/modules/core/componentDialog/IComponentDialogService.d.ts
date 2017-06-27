interface IComponentDialogService {
    open(componentName: string, ...args: any[]): angular.dialog.IDialogClosePromise;
}