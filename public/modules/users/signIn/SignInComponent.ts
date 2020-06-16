/** Sign-in popup */

export class SignInComponent implements angular.IComponentOptions {
    static $name = 'signIn';
    bindToController = true;
    controller = 'SignInController';
    controllerAs = 'signInCtrl';
    templateUrl = 'modules/users/signIn/SignInView.html';

    bindings = {
        closeAction: '&'
    }
}