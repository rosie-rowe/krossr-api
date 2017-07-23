declare module krossr.core.componentDialog {
    interface IComponentDialogService {
        open(componentName: string): angular.dialog.IDialogOpenResult;
    }
}